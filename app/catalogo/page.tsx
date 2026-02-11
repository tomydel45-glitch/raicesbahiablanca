'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowUpRight, Search, Filter, X, ChevronDown, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import productsData from '@/data/products.json';

interface Product {
  Producto: string;
  Marca: string;
  Dimensiones: string;
  Categoría: string;
  'Subcategoría 1': string;
  'Subcategoría 2': string;
  'Subcategoría 3': string;
  Descripción: string;
  STOCK: string;
  cloudinary_url: string | string[];
}

const categoryMap: Record<string, string> = {
  'accesorios': 'ACCESORIOS',
  'adhesivos-y-selladores': 'ADHESIVOS Y SELLADORES',
  'aislaciones': 'AISLACIONES',
  'herramientas': 'HERRAMIENTAS',
  'masillas-y-revoques': 'MASILLAS Y REVOQUES',
  'perfiles': 'PERFILES',
  'placas': 'PLACAS',
  'terminaciones': 'TERMINACIONES',
};

const categoryDisplayNames: Record<string, string> = {
  'ACCESORIOS': 'Accesorios',
  'ADHESIVOS Y SELLADORES': 'Adhesivos y Selladores',
  'AISLACIONES': 'Aislaciones',
  'HERRAMIENTAS': 'Herramientas',
  'MASILLAS Y REVOQUES': 'Masillas y Revoques',
  'PERFILES': 'Perfiles',
  'PLACAS': 'Placas',
  'TERMINACIONES': 'Terminaciones',
};

// Reverse map: display name → slug for URL
const reverseCategorySlugMap: Record<string, string> = Object.fromEntries(
  Object.entries(categoryMap).map(([slug, raw]) => [categoryDisplayNames[raw] || raw, slug])
);

// Generate slug from product name
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Categories that should NOT show subcategories
const categoriesWithoutSubcategories = ['AISLACIONES', 'MASILLAS Y REVOQUES', 'PLACAS'];

// Get unique categories from the data
const getUniqueCategories = (products: Product[]) => {
  const categories = [...new Set(products.map(p => p.Categoría).filter(Boolean))];
  return [
    { id: 'todos', label: 'Todos' },
    ...categories.map(cat => ({ 
      id: cat.toLowerCase().replace(/\s+/g, '-'), 
      label: categoryDisplayNames[cat] || cat 
    }))
  ];
};

// Get subcategories (Subcategoría 2) for a given category
const getSubcategoriesForCategory = (products: Product[], categoryDisplay: string): { label: string; count: number }[] => {
  const categoryKey = Object.entries(categoryDisplayNames).find(([, v]) => v === categoryDisplay)?.[0];
  if (!categoryKey || categoriesWithoutSubcategories.includes(categoryKey)) return [];
  
  const categoryProducts = products.filter(p => p.Categoría === categoryKey);
  const subMap = new Map<string, number>();
  let withoutSub = 0;
  
  categoryProducts.forEach(p => {
    const sub2 = p['Subcategoría 2']?.trim();
    if (sub2) {
      subMap.set(sub2, (subMap.get(sub2) || 0) + 1);
    } else {
      withoutSub++;
    }
  });
  
  const subs = Array.from(subMap.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => a.label.localeCompare(b.label));
  
  if (withoutSub > 0) {
    subs.push({ label: 'Otros', count: withoutSub });
  }
  
  return subs;
};

const getUniqueBrands = (products: Product[]) => {
  const brands = [...new Set(products.map(p => p.Marca.trim() === '' ? 'Genérico' : p.Marca).filter(Boolean))];
  return [
    { id: 'todas', label: 'Todas' },
    ...brands.sort().map(brand => ({ id: brand.toLowerCase(), label: brand }))
  ];
};

// Get unique USO values from Subcategoría 1
const getUniqueUsos = (products: Product[]) => {
  const usos = [...new Set(products.map(p => p['Subcategoría 1']?.trim()).filter(Boolean))];
  return [
    { id: 'todos', label: 'Todos' },
    ...usos.sort().map(uso => ({ id: uso.toLowerCase().replace(/\//g, '-'), label: uso }))
  ];
};

const PRODUCTS_PER_PAGE = 18;

export default function Catalogo() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState('Todas');
  const [selectedUso, setSelectedUso] = useState('Todos');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedSections, setExpandedSections] = useState({
    categories: false,
    brands: false,
    uso: false,
  });

  // Mobile drawer states
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [brandSearch, setBrandSearch] = useState('');
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [mobileExpandedSections, setMobileExpandedSections] = useState<string[]>([]);
  const [subcategoryView, setSubcategoryView] = useState<string | null>(null);

  const products = productsData as Product[];
  const categories = useMemo(() => getUniqueCategories(products), [products]);
  const brands = useMemo(() => getUniqueBrands(products), [products]);
  const usos = useMemo(() => getUniqueUsos(products), [products]);

  // Helper to update URL search params without full navigation
  const updateSearchParams = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }, [searchParams, pathname, router]);

  // Read all filter state from URL params
  useEffect(() => {
    const categoriaParam = searchParams.get('categoria');
    const subcategoriaParam = searchParams.get('subcategoria');
    const marcaParam = searchParams.get('marca');
    const buscarParam = searchParams.get('buscar');
    const paginaParam = searchParams.get('pagina');

    // Category
    if (categoriaParam && categoryMap[categoriaParam]) {
      const categoryName = categoryMap[categoriaParam];
      const displayName = categoryDisplayNames[categoryName] || categoryName;
      setSelectedCategory(displayName);
      setExpandedCategory(displayName);

      // Subcategory (depends on category context)
      if (subcategoriaParam) {
        const subs = getSubcategoriesForCategory(products, displayName);
        const matchedSub = subs.find(s => generateSlug(s.label) === subcategoriaParam);
        setSelectedSubcategory(matchedSub ? matchedSub.label : null);
      } else {
        setSelectedSubcategory(null);
      }
    } else if (!categoriaParam) {
      setSelectedCategory('Todos');
      setExpandedCategory(null);
      setSelectedSubcategory(null);
    }

    // Brand
    if (marcaParam) {
      const matchedBrand = brands.find(b => generateSlug(b.label) === marcaParam);
      setSelectedBrand(matchedBrand ? matchedBrand.label : 'Todas');
    } else {
      setSelectedBrand('Todas');
    }

    // Uso
    const usoParam = searchParams.get('uso');
    if (usoParam) {
      const matchedUso = usos.find(u => u.id === usoParam);
      setSelectedUso(matchedUso ? matchedUso.label : 'Todos');
    } else {
      setSelectedUso('Todos');
    }

    // Search
    setSearchQuery(buscarParam || '');

    // Page
    setCurrentPage(paginaParam ? parseInt(paginaParam, 10) || 1 : 1);
  }, [searchParams, products, brands, usos]);

  // Compute subcategories for the expanded category
  const subcategories = useMemo(() => {
    if (!expandedCategory || expandedCategory === 'Todos') return [];
    return getSubcategoriesForCategory(products, expandedCategory);
  }, [products, expandedCategory]);

  // Count products per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => {
      const display = categoryDisplayNames[p.Categoría] || p.Categoría;
      counts[display] = (counts[display] || 0) + 1;
    });
    counts['Todos'] = products.length;
    return counts;
  }, [products]);

  const handleCategoryChange = (category: string) => {
    if (selectedCategory === category && category !== 'Todos') {
      // Clicking same category again: deselect subcategory, show all of category
      setSelectedSubcategory(null);
      setCurrentPage(1);
      updateSearchParams({ subcategoria: null, pagina: null });
      return;
    }
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setCurrentPage(1);
    
    if (category === 'Todos') {
      setExpandedCategory(null);
      updateSearchParams({ categoria: null, subcategoria: null, pagina: null });
    } else {
      setExpandedCategory(category);
      const slug = reverseCategorySlugMap[category] || generateSlug(category);
      updateSearchParams({ categoria: slug, subcategoria: null, pagina: null });
    }
  };

  const handleSubcategoryChange = (subcategory: string) => {
    if (selectedSubcategory === subcategory) {
      setSelectedSubcategory(null);
      updateSearchParams({ subcategoria: null, pagina: null });
    } else {
      setSelectedSubcategory(subcategory);
      updateSearchParams({ subcategoria: generateSlug(subcategory), pagina: null });
    }
    setCurrentPage(1);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setCurrentPage(1);
    updateSearchParams({
      marca: brand === 'Todas' ? null : generateSlug(brand),
      pagina: null,
    });
  };

  const handleUsoChange = (uso: string) => {
    setSelectedUso(uso);
    setCurrentPage(1);
    updateSearchParams({
      uso: uso === 'Todos' ? null : uso.toLowerCase().replace(/\//g, '-'),
      pagina: null,
    });
  };

  const toggleSection = (section: 'categories' | 'brands' | 'uso') => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const filteredProducts = useMemo(() => products.filter((product) => {
    const productCategoryDisplay = categoryDisplayNames[product.Categoría] || product.Categoría;
    const categoryMatch = selectedCategory === 'Todos' || productCategoryDisplay === selectedCategory;
    
    // Subcategory filtering
    let subcategoryMatch = true;
    if (selectedSubcategory) {
      if (selectedSubcategory === 'Otros') {
        subcategoryMatch = !product['Subcategoría 2']?.trim();
      } else {
        subcategoryMatch = product['Subcategoría 2']?.trim() === selectedSubcategory;
      }
    }
    
    const productBrand = product.Marca.trim() === '' ? 'Genérico' : product.Marca;
    const brandMatch = selectedBrand === 'Todas' || productBrand === selectedBrand;
    
    // Uso (Subcategoría 1) filtering
    const productUso = product['Subcategoría 1']?.trim() || '';
    const usoMatch = selectedUso === 'Todos' || productUso === selectedUso;
    
    const searchMatch = searchQuery === '' || 
      product.Producto.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.Categoría.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.Marca.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.Descripción.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && subcategoryMatch && brandMatch && usoMatch && searchMatch;
  }), [products, selectedCategory, selectedSubcategory, selectedBrand, selectedUso, searchQuery]);

  const activeFilters = [
    ...(selectedCategory !== 'Todos' ? [{ type: 'category', value: selectedCategory }] : []),
    ...(selectedSubcategory ? [{ type: 'subcategory', value: selectedSubcategory }] : []),
    ...(selectedBrand !== 'Todas' ? [{ type: 'brand', value: selectedBrand }] : []),
    ...(selectedUso !== 'Todos' ? [{ type: 'uso', value: selectedUso }] : []),
    ...(searchQuery ? [{ type: 'search', value: searchQuery }] : []),
  ];

  const clearFilter = (type: string) => {
    if (type === 'category') { handleCategoryChange('Todos'); return; }
    if (type === 'subcategory') {
      setSelectedSubcategory(null);
      setCurrentPage(1);
      updateSearchParams({ subcategoria: null, pagina: null });
    }
    if (type === 'brand') {
      setSelectedBrand('Todas');
      updateSearchParams({ marca: null, pagina: null });
    }
    if (type === 'uso') {
      setSelectedUso('Todos');
      updateSearchParams({ uso: null, pagina: null });
    }
    if (type === 'search') {
      setSearchQuery('');
      updateSearchParams({ buscar: null, pagina: null });
    }
  };

  const clearAllFilters = () => {
    handleCategoryChange('Todos');
    setSelectedBrand('Todas');
    setSelectedUso('Todos');
    setSearchQuery('');
    setSelectedSubcategory(null);
    updateSearchParams({ categoria: null, subcategoria: null, marca: null, uso: null, buscar: null, pagina: null });
  };

  // Filtered brands for mobile search
  const filteredBrands = useMemo(() => {
    if (!brandSearch) return brands;
    return brands.filter(b => b.label.toLowerCase().includes(brandSearch.toLowerCase()));
  }, [brands, brandSearch]);

  const visibleBrands = useMemo(() => {
    if (showAllBrands) return filteredBrands;
    return filteredBrands.slice(0, 6);
  }, [filteredBrands, showAllBrands]);

  const hiddenBrandsCount = filteredBrands.length - 6;

  // Get subcategories for the subcategory view
  const subcategoryViewItems = useMemo(() => {
    if (!subcategoryView) return [];
    return getSubcategoriesForCategory(products, subcategoryView);
  }, [products, subcategoryView]);

  const toggleMobileSection = (section: string) => {
    setMobileExpandedSections(prev => 
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-muted/50">
      <Navbar />
      
      <section className="pt-28 pb-8">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Button + Search */}
            <div className="lg:hidden flex flex-col gap-3 w-full">
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 w-full"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <Filter className="h-4 w-4" />
                Filtros
                {activeFilters.length > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFilters.length}
                  </span>
                )}
              </Button>
              <div className="relative w-full">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Search className="h-4 w-4 text-primary-foreground" />
                </div>
                <Input
                  type="text"
                  placeholder="¿Qué estás buscando?"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                    updateSearchParams({ buscar: e.target.value || null, pagina: null });
                  }}
                  className="pl-13 pr-4 py-2.5 h-11 w-full rounded-xl bg-card border-border/50 focus:border-primary focus:ring-primary/20"
                  style={{ paddingLeft: '3.25rem' }}
                />
              </div>
            </div>

            {/* Mobile Filter Drawer */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
                {/* Subcategory second-level view */}
                {subcategoryView ? (
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-2 p-4 border-b border-border/50">
                      <button onClick={() => setSubcategoryView(null)} className="p-1 hover:bg-muted rounded-lg transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                      </button>
                      <SheetTitle className="text-lg">{subcategoryView}</SheetTitle>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-1">
                      {/* "Todas" option */}
                      <button
                        onClick={() => { setSelectedSubcategory(null); setSubcategoryView(null); }}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                          !selectedSubcategory 
                            ? 'bg-primary/10 text-primary font-medium' 
                            : 'hover:bg-muted/50 text-foreground'
                        }`}
                      >
                        <span>Todas las {subcategoryView.toLowerCase()}</span>
                        <span className="text-sm text-muted-foreground">({categoryCounts[subcategoryView] || 0})</span>
                      </button>
                      {subcategoryViewItems.map((sub) => (
                        <button
                          key={sub.label}
                          onClick={() => { handleSubcategoryChange(sub.label); setSubcategoryView(null); }}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                            selectedSubcategory === sub.label 
                              ? 'bg-primary/10 text-primary font-medium' 
                              : 'hover:bg-muted/50 text-foreground'
                          }`}
                        >
                          <span className="capitalize">{sub.label.toLowerCase()}</span>
                          <span className="text-sm text-muted-foreground">({sub.count})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="p-4 border-b border-border/50">
                      <SheetTitle className="text-xl font-bold">Filtros</SheetTitle>
                      
                      {/* Active filter chips */}
                      {activeFilters.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {activeFilters.map((filter, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1.5">
                              {filter.type === 'subcategory' && selectedCategory !== 'Todos' 
                                ? `${selectedCategory} > ${filter.value}` 
                                : filter.value}
                              <button onClick={() => clearFilter(filter.type)}>
                                <X className="h-3 w-3 ml-0.5" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Search */}
                    <div className="px-4 pt-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Buscar productos..."
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                            updateSearchParams({ buscar: e.target.value || null, pagina: null });
                          }}
                          className="pl-10 rounded-xl bg-muted/50 border-border/50"
                        />
                      </div>
                    </div>

                    {/* Scrollable content */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                      {/* Categories Accordion */}
                      <div>
                        <button
                          onClick={() => toggleMobileSection('categorias')}
                          className="w-full flex items-center justify-between py-3 font-semibold text-foreground"
                        >
                          <span>Categorías ({products.length})</span>
                          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileExpandedSections.includes('categorias') ? 'rotate-180' : ''}`} />
                        </button>
                        {mobileExpandedSections.includes('categorias') && (
                          <div className="space-y-0.5 animate-fade-in">
                            {categories.map((category) => {
                              const isSelected = selectedCategory === category.label;
                              const catSubcategories = category.label !== 'Todos' 
                                ? getSubcategoriesForCategory(products, category.label) 
                                : [];
                              const hasSubcategories = catSubcategories.length > 0;
                              
                              return (
                                <div key={category.id}>
                                  <button
                                    className={`w-full flex items-center justify-between py-2.5 px-3 rounded-xl transition-all ${
                                      isSelected 
                                        ? 'bg-primary/10 text-primary font-medium' 
                                        : 'text-foreground hover:bg-muted/50'
                                    }`}
                                    onClick={() => handleCategoryChange(category.label)}
                                  >
                                    <span className="flex items-center gap-2">
                                      <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                        isSelected ? 'bg-primary border-primary' : 'border-border/70'
                                      }`}>
                                        {isSelected && <span className="text-primary-foreground text-xs">✓</span>}
                                      </span>
                                      {category.label}
                                      <span className="text-muted-foreground font-normal text-sm">
                                        ({categoryCounts[category.label] || 0})
                                      </span>
                                    </span>
                                    {hasSubcategories && isSelected && (
                                      <span
                                        role="button"
                                        tabIndex={0}
                                        onClick={(e) => { 
                                          e.stopPropagation(); 
                                          setSubcategoryView(category.label); 
                                        }}
                                        className="text-xs text-primary underline underline-offset-2 cursor-pointer"
                                      >
                                        Subcategorías →
                                      </span>
                                    )}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Brands Accordion */}
                      <div>
                        <button
                          onClick={() => toggleMobileSection('marcas')}
                          className="w-full flex items-center justify-between py-3 font-semibold text-foreground"
                        >
                          <span>Marcas</span>
                          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileExpandedSections.includes('marcas') ? 'rotate-180' : ''}`} />
                        </button>
                        {mobileExpandedSections.includes('marcas') && (
                          <div className="space-y-2 animate-fade-in">
                            {/* Brand search */}
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                              <Input
                                placeholder="Buscar marca..."
                                value={brandSearch}
                                onChange={(e) => { setBrandSearch(e.target.value); setShowAllBrands(true); }}
                                className="pl-9 h-9 text-sm rounded-xl bg-muted/50 border-border/50"
                              />
                            </div>
                            <div className="space-y-0.5">
                              {visibleBrands.map((brand) => (
                                <button
                                  key={brand.id}
                                  className={`w-full flex items-center gap-2 py-2 px-3 rounded-xl transition-all text-sm ${
                                    selectedBrand === brand.label 
                                      ? 'bg-primary/10 text-primary font-medium' 
                                      : 'text-foreground hover:bg-muted/50'
                                  }`}
                                  onClick={() => handleBrandChange(brand.label)}
                                >
                                  <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                    selectedBrand === brand.label ? 'bg-primary border-primary' : 'border-border/70'
                                  }`}>
                                    {selectedBrand === brand.label && <span className="text-primary-foreground text-xs">✓</span>}
                                  </span>
                                  {brand.label}
                                </button>
                              ))}
                            </div>
                            {!showAllBrands && !brandSearch && hiddenBrandsCount > 0 && (
                              <button
                                onClick={() => setShowAllBrands(true)}
                                className="w-full text-sm text-primary font-medium py-2 hover:underline"
                              >
                                + Ver todas las marcas ({hiddenBrandsCount} más)
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Uso Accordion */}
                      <div>
                        <button
                          onClick={() => toggleMobileSection('uso')}
                          className="w-full flex items-center justify-between py-3 font-semibold text-foreground"
                        >
                          <span>Uso</span>
                          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileExpandedSections.includes('uso') ? 'rotate-180' : ''}`} />
                        </button>
                        {mobileExpandedSections.includes('uso') && (
                          <div className="space-y-0.5 animate-fade-in">
                            {usos.map((uso) => (
                              <button
                                key={uso.id}
                                className={`w-full flex items-center gap-2 py-2 px-3 rounded-xl transition-all text-sm ${
                                  selectedUso === uso.label 
                                    ? 'bg-primary/10 text-primary font-medium' 
                                    : 'text-foreground hover:bg-muted/50'
                                }`}
                                onClick={() => handleUsoChange(uso.label)}
                              >
                                <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                  selectedUso === uso.label ? 'bg-primary border-primary' : 'border-border/70'
                                }`}>
                                  {selectedUso === uso.label && <span className="text-primary-foreground text-xs">✓</span>}
                                </span>
                                {uso.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-border/50 flex gap-3 bg-background">
                      <Button variant="outline" className="flex-1 rounded-xl" onClick={() => { clearAllFilters(); }}>
                        Limpiar filtros
                      </Button>
                      <Button className="flex-1 rounded-xl" onClick={() => setMobileFiltersOpen(false)}>
                        Ver {filteredProducts.length} productos
                      </Button>
                    </div>
                  </>
                )}
              </SheetContent>
            </Sheet>

            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block lg:w-72 flex-shrink-0">
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 p-6 sticky top-24 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-xl text-foreground">Filtros</h3>
                    <button 
                      className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Filter className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <button 
                    onClick={() => toggleSection('categories')}
                    className="w-full flex items-center justify-between font-semibold text-sm text-foreground mb-3"
                  >
                    <span>Categorías</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSections.categories && (
                    <div className="space-y-1">
                      {categories.map((category) => {
                        const isSelected = selectedCategory === category.label;
                        const isExpanded = expandedCategory === category.label;
                        const catSubcategories = category.label !== 'Todos' 
                          ? getSubcategoriesForCategory(products, category.label) 
                          : [];
                        const hasSubcategories = catSubcategories.length > 0;
                        
                        return (
                          <div key={category.id}>
                            <label
                              className="flex items-center gap-3 cursor-pointer group py-1.5"
                            >
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={() => handleCategoryChange(category.label)}
                                className="rounded border-border/70 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                              />
                              <span className={`text-sm transition-colors flex-1 ${
                                isSelected 
                                  ? 'text-foreground font-medium' 
                                  : 'text-muted-foreground group-hover:text-foreground'
                              }`}>
                                {category.label}
                                <span className="text-muted-foreground font-normal ml-1">
                                  ({categoryCounts[category.label] || 0})
                                </span>
                              </span>
                              {hasSubcategories && isSelected && (
                                <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                              )}
                            </label>
                            
                            {/* Subcategories */}
                            {hasSubcategories && isExpanded && (
                              <div className="ml-7 mt-1 mb-2 space-y-0.5 border-l-2 border-primary/20 pl-3 animate-fade-in">
                                {catSubcategories.map((sub) => (
                                  <button
                                    key={sub.label}
                                    onClick={() => handleSubcategoryChange(sub.label)}
                                    className={`w-full text-left text-sm py-1.5 px-2 rounded-lg transition-all duration-200 flex items-center justify-between ${
                                      selectedSubcategory === sub.label
                                        ? 'bg-primary/10 text-primary font-medium'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                    }`}
                                    aria-label={`Filtrar por subcategoría ${sub.label}`}
                                  >
                                    <span className="capitalize">{sub.label.toLowerCase()}</span>
                                    <span className={`text-xs ${selectedSubcategory === sub.label ? 'text-primary' : 'text-muted-foreground'}`}>
                                      ({sub.count})
                                    </span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <button 
                    onClick={() => toggleSection('brands')}
                    className="w-full flex items-center justify-between font-semibold text-sm text-foreground mb-3"
                  >
                    <span>Marcas</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.brands ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSections.brands && (
                    <div className="space-y-2">
                      {brands.map((brand) => (
                        <label
                          key={brand.id}
                          className="flex items-center gap-3 cursor-pointer group py-1.5"
                        >
                          <Checkbox
                            checked={selectedBrand === brand.label}
                            onCheckedChange={() => handleBrandChange(brand.label)}
                            className="rounded border-border/70 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <span className={`text-sm transition-colors ${
                            selectedBrand === brand.label 
                              ? 'text-foreground font-medium' 
                              : 'text-muted-foreground group-hover:text-foreground'
                          }`}>
                            {brand.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Uso */}
                <div>
                  <button 
                    onClick={() => toggleSection('uso')}
                    className="w-full flex items-center justify-between font-semibold text-sm text-foreground mb-3"
                  >
                    <span>Uso</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.uso ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSections.uso && (
                    <div className="space-y-2">
                      {usos.map((uso) => (
                        <label
                          key={uso.id}
                          className="flex items-center gap-3 cursor-pointer group py-1.5"
                        >
                          <Checkbox
                            checked={selectedUso === uso.label}
                            onCheckedChange={() => handleUsoChange(uso.label)}
                            className="rounded border-border/70 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <span className={`text-sm transition-colors ${
                            selectedUso === uso.label 
                              ? 'text-foreground font-medium' 
                              : 'text-muted-foreground group-hover:text-foreground'
                          }`}>
                            {uso.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </aside>

            {/* Products Section */}
            <div className="flex-1">
              {/* Desktop Search Bar */}
              <div className="hidden lg:block mb-6">
                <div className="relative max-w-xl">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                    <Search className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <Input
                    type="text"
                    placeholder="¿Qué estás buscando?"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                      updateSearchParams({ buscar: e.target.value || null, pagina: null });
                    }}
                    className="pl-14 pr-4 py-3 h-12 rounded-xl bg-card border-border/50 focus:border-primary focus:ring-primary/20 text-base"
                  />
                </div>
              </div>

              {/* Active Filters */}
              {activeFilters.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {activeFilters.map((filter, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/80 text-secondary-foreground rounded-full text-sm"
                    >
                      {filter.value}
                      <button 
                        onClick={() => clearFilter(filter.type)}
                        className="hover:text-destructive transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ))}
                  <button 
                    onClick={clearAllFilters}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                  >
                    Limpiar todo
                  </button>
                </div>
              )}

              {/* Products Grid */}
              {(() => {
                const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
                const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
                const paginatedProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
                
                return (
                  <>
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
                      {paginatedProducts.map((product, index) => (
                        <Link
                          key={`${product.Producto}-${index}`}
                          href={`/producto/${generateSlug(product.Producto)}`}
                          className="group relative bg-card/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/30 hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-up"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-muted/50 p-4">
                            <img
                              src={Array.isArray(product.cloudinary_url) ? product.cloudinary_url[0] : product.cloudinary_url}
                              alt={product.Producto}
                              className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-500"
                            />
                            <button className="absolute bottom-4 right-4 w-10 h-10 bg-muted/80 backdrop-blur-sm rounded-full flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-lg">
                              <ArrowUpRight className="h-5 w-5" />
                            </button>
                          </div>
                          <div className="p-5">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                              {product.Producto}
                            </h3>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
                                {categoryDisplayNames[product.Categoría] || product.Categoría}
                              </span>
                              {product.Marca.trim() !== '' && (
                                <span className="text-xs text-muted-foreground">
                                  {product.Marca}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {filteredProducts.length > 0 && (
                      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-muted-foreground text-sm order-2 sm:order-1">
                          Mostrando {startIndex + 1}-{Math.min(startIndex + PRODUCTS_PER_PAGE, filteredProducts.length)} de <span className="font-semibold text-foreground">{filteredProducts.length}</span> resultados
                        </p>
                        
                        {totalPages > 1 && (
                          <div className="flex items-center gap-2 order-1 sm:order-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                const newPage = Math.max(1, currentPage - 1);
                                setCurrentPage(newPage);
                                updateSearchParams({ pagina: newPage > 1 ? String(newPage) : null });
                              }}
                              disabled={currentPage === 1}
                              className="h-9 w-9 rounded-lg"
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            
                            <div className="flex items-center gap-1">
                              {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter(page => {
                                  if (totalPages <= 5) return true;
                                  if (page === 1 || page === totalPages) return true;
                                  if (Math.abs(page - currentPage) <= 1) return true;
                                  return false;
                                })
                                .map((page, idx, arr) => (
                                  <div key={page} className="flex items-center">
                                    {idx > 0 && arr[idx - 1] !== page - 1 && (
                                      <span className="px-1 text-muted-foreground">...</span>
                                    )}
                                    <Button
                                      variant={currentPage === page ? "default" : "outline"}
                                      size="icon"
                                      onClick={() => {
                                        setCurrentPage(page);
                                        updateSearchParams({ pagina: page > 1 ? String(page) : null });
                                      }}
                                      className="h-9 w-9 rounded-lg"
                                    >
                                      {page}
                                    </Button>
                                  </div>
                                ))}
                            </div>
                            
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                const newPage = Math.min(totalPages, currentPage + 1);
                                setCurrentPage(newPage);
                                updateSearchParams({ pagina: newPage > 1 ? String(newPage) : null });
                              }}
                              disabled={currentPage === totalPages}
                              className="h-9 w-9 rounded-lg"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                );
              })()}

              {/* Empty State */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-20 bg-card/40 rounded-2xl border border-border/30">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-lg mb-2">
                    No se encontraron productos
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Intentá con otros filtros o términos de búsqueda
                  </p>
                  <Button
                    variant="outline"
                    onClick={clearAllFilters}
                    className="rounded-full"
                  >
                    Limpiar filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
