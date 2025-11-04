"use client";

import { Mail, Phone, Clock, MessageSquare } from "lucide-react";
import Footer from "@/components/footer";
import { useState, useRef, useEffect } from "react";
import * as styles from "./page.styles";

type Status = "PENDING" | "APPROVED" | "UNDER REVIEW" | "REJECTED";

interface AppItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  status: Status;
  total: string;
  down: string;
  emi: string;
  tenure: string;
  income: string;
  employment: string;
}

const sampleApps: AppItem[] = [
  {
    id: "A1",
    name: "Kitwishiii Kitwishiii",
    email: "kitwishiiikitwishiii@gmail.com",
    phone: "8628875654",
    date: "2025-10-30T22:38:00",
    status: "PENDING",
    total: "₹50,000",
    down: "₹8,000",
    emi: "₹3,732",
    tenure: "12 months",
    income: "₹120,000",
    employment: "Salaried",
  },
  {
    id: "A2",
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    phone: "9876543210",
    date: "2025-10-29T14:15:00",
    status: "APPROVED",
    total: "₹75,000",
    down: "₹15,000",
    emi: "₹5,500",
    tenure: "12 months",
    income: "₹150,000",
    employment: "Salaried",
  },
  {
    id: "A3",
    name: "Priya Patel",
    email: "priya.patel@gmail.com",
    phone: "9123456789",
    date: "2025-10-28T11:20:00",
    status: "UNDER REVIEW",
    total: "₹35,000",
    down: "₹5,000",
    emi: "₹2,800",
    tenure: "12 months",
    income: "₹80,000",
    employment: "Salaried",
  },
];

export default function AdminDashboard() {
  // Category state for demo interactivity
  const categories = [
    { name: 'Bedroom', desc: 'Manage bedroom furniture and accessories with premium quality standards', color: 'brown' },
    { name: 'Living Room', desc: 'Manage living room furniture and accessories with premium quality standards', color: 'blue' },
    { name: 'Dining Room', desc: 'Manage dining room furniture and accessories with premium quality standards', color: 'brown' },
    { name: 'Office', desc: 'Manage office furniture and accessories with premium quality standards', color: 'blue' },
  ];

  // State for filtered products view
  const [viewingProducts, setViewingProducts] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  
  // Demo handlers for category actions
  const handleEditCategory = (name: string) => {
    const action = confirm(`What would you like to do with "${name}" category?\n\nClick OK to Rename\nClick Cancel to Delete`);
    
    if (action) {
      // User chose to rename
      setEditingCategory(name);
      setNewCategoryName(name);
    } else {
      // User chose to delete
      const confirmDelete = confirm(`Are you sure you want to delete the "${name}" category?\n\nThis action cannot be undone.`);
      if (confirmDelete) {
        handleDeleteCategory(name);
      }
    }
  };

  const handleDeleteCategory = (name: string) => {
    // Remove category from categories array
    const updatedCategories = categories.filter(cat => cat.name !== name);
    // Note: In a real app, you'd update the state properly. For demo, we'll just show alert
    alert(`Category "${name}" has been deleted successfully!`);
    // You would typically do: setCategories(updatedCategories);
  };

  const handleRenameCategory = (oldName: string) => {
    if (newCategoryName.trim() && newCategoryName !== oldName) {
      // In a real app, you'd update the category name in state
      alert(`Category "${oldName}" has been renamed to "${newCategoryName}"!`);
      // You would typically update the categories array and products that reference this category
    }
    setEditingCategory(null);
    setNewCategoryName('');
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setNewCategoryName('');
  };

  const handleViewProducts = (name: string) => {
    setViewingProducts(name);
    setActiveTab('PRODUCTS');
  };
  // Orders state for interactivity
  const initialOrders = [
    {
      id: 'ORD001',
      customer: 'Rajesh Gupta',
      email: 'rajesh.gupta@gmail.com',
      phone: '9876543210',
      date: '30 Oct 2025',
      products: ['Luxury King Size Bed', 'Bedside Table Set'],
      price: 55000,
      status: 'PROCESSING',
    },
    {
      id: 'ORD002',
      customer: 'Meera Singh',
      email: 'meera.singh@gmail.com',
      phone: '8765432109',
      date: '29 Oct 2025',
      products: ['Modern Sofa Set', 'Coffee Table'],
      price: 75000,
      status: 'SHIPPED',
    },
  ];
  const [orders, setOrders] = useState(initialOrders);

  // Toggle order status
  const handleOrderStatus = (id: string) => {
    setOrders(prev => prev.map(order =>
      order.id === id
        ? { ...order, status: order.status === 'PROCESSING' ? 'SHIPPED' : 'PROCESSING' }
        : order
    ));
  };
  // Sample product data for demo
  const initialProducts = [
    {
      id: 'P1',
      name: 'Luxury King Size Bed',
      category: 'Bedroom',
      price: 45000,
      stock: 12,
      status: 'active',
      image: '/images/bed.jpg',
    },
    {
      id: 'P2',
      name: 'Modern Sofa Set',
      category: 'Living Room',
      price: 65000,
      stock: 8,
      status: 'active',
      image: '/images/sofa.jpg',
    },
    {
      id: 'P3',
      name: 'Executive Office Chair',
      category: 'Office',
      price: 25000,
      stock: 0,
      status: 'inactive',
      image: '/images/chair.jpg',
    },
  ];
  const [products, setProducts] = useState(initialProducts);
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [editStock, setEditStock] = useState<number>(0);
  const [apps, setApps] = useState<AppItem[]>(sampleApps);
  // Handle edit button click
  const handleEditProduct = (id: string) => {
    const prod = products.find(p => p.id === id);
    if (prod) {
      setEditProductId(id);
      setEditStock(prod.stock);
    }
  };

  // Handle save stock
  const handleSaveStock = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: editStock } : p));
    setEditProductId(null);
  };

  // Handle activate/deactivate
  const handleToggleStatus = (id: string) => {
    setProducts(prev => prev.map(p =>
      p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
    ));
  };
  
  const [activeTab, setActiveTab] = useState<'EMI' | 'CONTACT' | 'PRODUCTS' | 'ORDERS' | 'CATEGORY'>('EMI');
  const [emiFilter, setEmiFilter] = useState<'ALL' | Status>('ALL');

  // refs to measure tab positions so we can render a centered indicator exactly under the active tab
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({} as Record<string, HTMLButtonElement | null>);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const measure = () => {
      const btn = tabRefs.current[activeTab];
      const container = tabsContainerRef.current;
      if (!btn || !container) {
        setIndicator(null);
        return;
      }
      const btnRect = btn.getBoundingClientRect();
      const contRect = container.getBoundingClientRect();
      // leave a small horizontal padding so the indicator is slightly narrower than the tab
      const padding = 24;
      const width = Math.max(48, btnRect.width - padding);
      const left = btnRect.left - contRect.left + padding / 2;
      setIndicator({ left, width });
    };

    // measure now and on resize
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [activeTab]);

  interface ContactMsg {
    id: string;
    name: string;
    email: string;
    phone: string;
    date: string;
    message: string;
    status: 'NEW' | 'REPLIED' | 'RESOLVED';
  }

  const [messages, setMessages] = useState<ContactMsg[]>([
    {
      id: 'M1',
      name: 'Amit Kumar',
      email: 'amit.kumar@gmail.com',
      phone: '9988776655',
      date: '2025-10-30T15:45:00',
      message: 'I am interested in your bedroom furniture collection. Can you provide more details about customization options?',
      status: 'NEW',
    },
    {
      id: 'M2',
      name: 'Sneha Reddy',
      email: 'sneha.reddy@gmail.com',
      phone: '8877665544',
      date: '2025-10-29T13:30:00',
      message: 'Do you offer delivery to Hyderabad? Any lead times I should be aware of?',
      status: 'REPLIED',
    },
  ]);

  const toggleStatus = (id: string) => {
    setApps(prev => prev.map(a => {
      if (a.id !== id) return a;
      // simple demo toggle: PENDING -> APPROVED, otherwise -> PENDING
      const newStatus: Status = a.status === 'PENDING' ? 'APPROVED' : 'PENDING';
      return { ...a, status: newStatus };
    }));
  };

  const viewDetails = (id: string) => {
    const app = apps.find(a => a.id === id);
    if (app) alert(`${app.name}\n${app.email}\nStatus: ${app.status}`);
  };

  const replyToMessage = (id: string) => {
    const msg = messages.find(m => m.id === id);
    if (msg) alert(`Reply to ${msg.name} (${msg.email})`);
  };

  const markResolved = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'RESOLVED' } : m));
  };

  // Calculate dynamic metrics
  const totalRevenue = orders.reduce((sum, order) => sum + order.price, 0);
  const activeOrdersCount = orders.filter(order => order.status === 'PROCESSING').length;
  const newInquiriesCount = messages.filter(msg => msg.status === 'NEW').length;
  const awaitingResponseCount = messages.filter(msg => msg.status === 'NEW' || msg.status === 'REPLIED').length;
  const categoriesCount = categories.length;
  const productsCount = products.length;

  const metrics = [
    { 
      label: "TOTAL REVENUE", 
      value: `₹${(totalRevenue / 100000).toFixed(1)}L`, 
      trend: "+15% this month" 
    },
    { 
      label: "ACTIVE ORDERS", 
      value: orders.length.toString(), 
      sub: `${activeOrdersCount} pending delivery` 
    },
    { 
      label: "NEW INQUIRIES", 
      value: messages.length.toString(), 
      sub: `${awaitingResponseCount} awaiting response` 
    },
    { 
      label: "PRODUCTS", 
      value: productsCount.toString(), 
      sub: `${categoriesCount} categories` 
    },
  ];

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // Filtered EMI applications
  const filteredApps = emiFilter === 'ALL' ? apps : apps.filter(a => a.status === emiFilter);

  return (
    <div className={styles.pageRoot}>
      {/* Banner */}
      <div className={styles.banner} style={{ backgroundImage: "url('/images/back.jpg')", height: 200 }}>
        {/* slightly reduced overlay opacity and banner height so page content doesn't get visually obscured */}
        <div className={styles.bannerOverlay} style={{ backgroundColor: 'rgba(169,124,81,0.60)' }} />
        <div className={styles.bannerInner}>
          <h1 className={styles.bannerTitle} style={{ textShadow: '0 6px 18px rgba(0,0,0,0.25)' }}>Executive Dashboard</h1>
          <p className={styles.bannerDesc}>Sophisticated management suite for premium furniture operations</p>
        </div>
      </div>

      {/* add a visible gap below the banner so metrics/cards sit lower (matches mock) */}
      <div className={styles.metricsContainer}>
        {/* Metrics cards */}
        <section className={styles.metricsGrid}>
          {metrics.map((m, idx) => (
            <div key={m.label} className={styles.metricCard}>
              {/* Left: label, big value, small sub/trend */}
              <div className="flex-1">
                <div className={styles.metricLabel}>{m.label}</div>
                <div className={styles.metricValue}>{m.value}</div>
                {m.trend && <div className={styles.metricTrend}>{m.trend}</div>}
                {m.sub && <div className={styles.metricSub}>{m.sub}</div>}
              </div>

              {/* Right: colored icon box */}
              <div className={styles.metricIconBox} style={{ backgroundColor: idx === 0 ? '#CFAE8D' : idx === 1 ? '#3B82F6' : idx === 2 ? '#F59E0B' : '#A78BFA' }}>
                <div className="text-white text-xl">{idx === 0 ? '₹' : idx === 1 ? '📦' : idx === 2 ? '✉️' : '📁'}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Tabs and filters */}
        <div className={styles.tabsOuter}>
          <div className={styles.tabsContainer}>
            <div ref={tabsContainerRef} className={styles.tabsRow}>
              <button ref={(el: HTMLButtonElement | null) => { tabRefs.current['EMI'] = el }} onClick={() => setActiveTab('EMI')} className={`${styles.tabButton} ${activeTab === 'EMI' ? styles.tabButtonActive : styles.tabButtonInactive}`}>
                <span>EMI Applications</span>
                <span className={`${styles.tabBadge} ${activeTab === 'EMI' ? styles.tabBadgeActive : styles.tabBadgeInactive}`}>3</span>
              </button>
              <button ref={(el: HTMLButtonElement | null) => { tabRefs.current['CONTACT'] = el }} onClick={() => setActiveTab('CONTACT')} className={`px-3 py-4 rounded-none text-sm inline-flex items-center gap-3 ${activeTab === 'CONTACT' ? styles.tabButtonActive : styles.tabButtonInactive}`}>
                <span>Contact Messages</span>
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === 'CONTACT' ? styles.tabBadgeActive : styles.tabBadgeInactive}`}>2</span>
              </button>

              <button ref={(el: HTMLButtonElement | null) => { tabRefs.current['PRODUCTS'] = el }} onClick={() => setActiveTab('PRODUCTS')} className={`px-5 py-3 rounded-none text-sm ${activeTab === 'PRODUCTS' ? styles.tabButtonActive : styles.tabButtonInactive}`}>Products <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === 'PRODUCTS' ? styles.tabBadgeActive : styles.tabBadgeInactive}`}>{products.length}</span></button>
              <button ref={(el: HTMLButtonElement | null) => { tabRefs.current['ORDERS'] = el }} onClick={() => setActiveTab('ORDERS')} className={`px-5 py-3 rounded-none text-sm ${activeTab === 'ORDERS' ? styles.tabButtonActive : styles.tabButtonInactive}`}>Orders <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === 'ORDERS' ? styles.tabBadgeActive : styles.tabBadgeInactive}`}>2</span></button>
              <button ref={(el: HTMLButtonElement | null) => { tabRefs.current['CATEGORY'] = el }} onClick={() => setActiveTab('CATEGORY')} className={`px-5 py-3 rounded-r-2xl text-sm ${activeTab === 'CATEGORY' ? styles.tabButtonActive : styles.tabButtonInactive}`}>Category <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === 'CATEGORY' ? styles.tabBadgeActive : styles.tabBadgeInactive}`}>{categories.length}</span></button>

              {/* single measured indicator positioned under the active tab */}
              {indicator && (
                <span style={{ left: indicator.left - 10, width: indicator.width + 20, bottom: -2 }} className={styles.tabIndicator} />
              )}
            </div>
          </div>
        </div>

          {activeTab === 'EMI' && (
            <>
          <div className={styles.filterRow}>
            <button onClick={() => setEmiFilter('ALL')} className={`${styles.filterButton} ${emiFilter === 'ALL' ? styles.filterButtonActive : styles.filterButtonInactive}`}>All</button>
            <button onClick={() => setEmiFilter('PENDING')} className={`px-5 py-3 rounded-2xl font-medium shadow-sm ${emiFilter === 'PENDING' ? styles.filterButtonActive : styles.filterButtonInactive}`}>Pending</button>
            <button onClick={() => setEmiFilter('UNDER REVIEW')} className={`px-5 py-3 rounded-2xl font-medium shadow-sm ${emiFilter === 'UNDER REVIEW' ? styles.filterButtonActive : styles.filterButtonInactive}`}>Under review</button>
            <button onClick={() => setEmiFilter('APPROVED')} className={`px-5 py-3 rounded-2xl font-medium shadow-sm ${emiFilter === 'APPROVED' ? styles.filterButtonActive : styles.filterButtonInactive}`}>Approved</button>
            <button onClick={() => setEmiFilter('REJECTED')} className={`px-5 py-3 rounded-2xl font-medium shadow-sm ${emiFilter === 'REJECTED' ? styles.filterButtonActive : styles.filterButtonInactive}`}>Rejected</button>
          </div>
          <div className={styles.emiCardContainer}>
            <div className="space-y-5">
              {filteredApps.map((a) => (
                <article key={a.id} className={styles.emiCard}>
                  <div className="relative">
                    <div className="absolute right-6 top-6">
                      <span className={`${styles.emiStatus} ${a.status === 'PENDING' ? styles.emiStatusPending : a.status === 'APPROVED' ? styles.emiStatusApproved : styles.emiStatusOther}`}>
                        {a.status}
                      </span>
                    </div>
                    <div className="w-full">
                      <div className="flex gap-6">
                        <div className="w-2/3">
                          <h4 className={styles.emiCardName}>{a.name}</h4>
                          <div className={styles.emiCardInfo}>
                            <div className={styles.emiCardInfoRow}><Mail size={14} /> <span>{a.email}</span></div>
                            <div className={`${styles.emiCardInfoRow} ${styles.emiCardInfoRowMargin}`}><Phone size={14} /> <span>{a.phone}</span></div>
                            <div className={`${styles.emiCardInfoRow} ${styles.emiCardInfoRowMargin}`}><Clock size={14} /> <span>{formatDate(a.date)}</span></div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.emiCardStatsGrid}>
                        <div className={styles.emiStatCard} style={{ borderColor: 'rgba(94,82,64,0.04)' }}>
                          <div className={styles.emiStatLabel}>Total Amount</div>
                          <div className={styles.emiStatValue}>{a.total}</div>
                          <div className={styles.emiStatSub}>Down Payment: {a.down}</div>
                        </div>
                        <div className={styles.emiStatCard} style={{ borderColor: 'rgba(94,82,64,0.04)' }}>
                          <div className={styles.emiStatLabel}>Monthly EMI</div>
                          <div className={styles.emiStatValue}>{a.emi}</div>
                          <div className={styles.emiStatSub}>Tenure: {a.tenure}</div>
                        </div>
                        <div className={styles.emiStatCard} style={{ borderColor: 'rgba(94,82,64,0.04)' }}>
                          <div className={styles.emiStatLabel}>Monthly Income</div>
                          <div className={styles.emiStatValue}>{a.income}</div>
                          <div className={styles.emiStatSub}>{a.employment}</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.updateStatusButton}>
                      <button onClick={() => toggleStatus(a.id)} className={styles.updateStatusBtn}>Update Status</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          </>
      )}

          {activeTab === 'PRODUCTS' && (
            <>
              {viewingProducts && (
                <div className="mt-6 mb-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setViewingProducts(null)}
                      className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      ← Back to All Products
                    </button>
                    <h2 className="text-xl font-serif font-semibold text-[#8b6e5b]">
                      {viewingProducts} Products
                    </h2>
                  </div>
                </div>
              )}
              <section className={styles.productsGrid}>
                {(viewingProducts 
                  ? products.filter(p => p.category === viewingProducts)
                  : products
                ).map(product => (
                  <div key={product.id} className={styles.productCard}>
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className={styles.productImage}
                        onError={(e) => {
                          // Fallback to a default image if the specific image fails to load
                          e.currentTarget.src = '/images/bed.jpg';
                        }}
                      />
                      <span className={styles.productCategoryBadge}>{product.category}</span>
                      <span className={`${styles.productStatusBadge} ${product.status === 'active' ? styles.productStatusActive : styles.productStatusInactive}`}>{product.status}</span>
                      {/* Debug info - remove in production */}
                      <span className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">ID: {product.id}</span>
                    </div>
                    <div className="mt-6 flex-1">
                      <h3 className={styles.productName}>{product.name}</h3>
                      <div className={styles.productPriceRow}>
                        <span className={styles.productPrice}>₹{product.price.toLocaleString('en-IN')}</span>
                        {editProductId === product.id ? (
                          <span className="flex items-center gap-2">
                            <input
                              type="number"
                              className="border rounded px-2 py-1 w-20 text-sm"
                              value={editStock}
                              min={0}
                              onChange={e => setEditStock(Number(e.target.value))}
                            />
                            <button
                              className="ml-2 px-3 py-1 rounded bg-[#A97C51] text-white text-xs"
                              onClick={() => handleSaveStock(product.id)}
                            >Save</button>
                            <button
                              className="ml-1 px-2 py-1 rounded bg-gray-200 text-xs"
                              onClick={() => setEditProductId(null)}
                            >Cancel</button>
                          </span>
                        ) : (
                          <span className={`${styles.productStock} ${product.stock > 0 ? styles.productStockActive : styles.productStockInactive}`}>Stock: {product.stock}</span>
                        )}
                      </div>
                    </div>
                    <div className={styles.productActions}>
                      <button
                        className={`${styles.productActionBtn} ${styles.productActionEdit}`}
                        onClick={() => handleEditProduct(product.id)}
                        disabled={editProductId !== null}
                      >Edit</button>
                      <button
                        className={`${styles.productActionBtn} ${styles.productActionInactive}`}
                        onClick={() => handleToggleStatus(product.id)}
                      >{product.status === 'active' ? 'Deactivate' : 'Activate'}</button>
                    </div>
                  </div>
                ))}
              </section>
              {viewingProducts && (
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Showing {products.filter(p => p.category === viewingProducts).length} products in {viewingProducts} category
                  </p>
                </div>
              )}
            </>
          )}

        {/* Content area: either Applications or Contact Messages depending on active tab */}
        <section className="mt-6">
          {activeTab === 'ORDERS' && (
            <div className={styles.ordersContainer}>
              {orders.map(order => (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <div>
                      <div className={styles.orderTitle}>Order #{order.id}</div>
                      <div className={styles.orderCustomer}>{order.customer}</div>
                      <div className={styles.orderEmail}>{order.email}</div>
                      <div className={styles.orderPhone}>{order.phone}</div>
                      <div className={styles.orderDate}>{order.date}</div>
                    </div>
                    <div>
                      {order.status === 'PROCESSING' && (
                        <span className={styles.orderStatusProcessing}>PROCESSING</span>
                      )}
                      {order.status === 'SHIPPED' && (
                        <span className={styles.orderStatusShipped}>SHIPPED</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className={styles.orderProductsLabel}>PRODUCTS</div>
                    <div className={styles.orderProductsBox}>
                      {order.products.map((prod, idx) => (
                        <div key={prod} className={styles.orderProductItem}>
                          <span className={styles.orderProductDot} />
                          {prod}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.orderFooter}>
                    <div className={styles.orderPrice}>₹{order.price.toLocaleString('en-IN')}</div>
                    <button
                      className={styles.orderUpdateBtn}
                      onClick={() => handleOrderStatus(order.id)}
                    >Update Status</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'CATEGORY' && (
            <div className={styles.categoryContainer}>
              <div className={styles.categoryGrid}>
                {categories.map((cat, idx) => (
                  <div key={cat.name} className={styles.categoryCard}>
                    <div className={styles.categoryHeader}>
                      {editingCategory === cat.name ? (
                        <div className="flex-1">
                          <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            className="text-xl font-serif font-semibold mb-2 border border-[#A97C51] rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#A97C51]"
                            placeholder="Enter new category name"
                          />
                        </div>
                      ) : (
                        <h3 className={styles.categoryTitle}>{cat.name}</h3>
                      )}
                      <span className={`${styles.categoryIcon} ${cat.color === 'blue' ? styles.categoryIconBlue : styles.categoryIconBrown}`}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4L4 10V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V10L12 4Z" stroke="white" strokeWidth="2" strokeLinejoin="round" fill="none" />
                        </svg>
                      </span>
                    </div>
                    <p className={styles.categoryDesc}>{cat.desc}</p>
                    <div className={styles.categoryActions}>
                      {editingCategory === cat.name ? (
                        <>
                          <button
                            className="flex-1 px-6 py-3 rounded-2xl bg-[#A97C51] text-white font-medium shadow-sm"
                            onClick={() => handleRenameCategory(cat.name)}
                          >Save</button>
                          <button
                            className="flex-1 px-6 py-3 rounded-2xl bg-gray-300 text-gray-700 font-medium shadow-sm"
                            onClick={handleCancelEdit}
                          >Cancel</button>
                        </>
                      ) : (
                        <>
                          <button
                            className={styles.categoryActionEdit}
                            onClick={() => handleEditCategory(cat.name)}
                          >Edit</button>
                          <button
                            className={styles.categoryActionView}
                            onClick={() => handleViewProducts(cat.name)}
                          >View Products</button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'CONTACT' && (
            <div className={styles.contactContainer}>
              <div className="space-y-5">
                {messages.map((m) => (
                  <article key={m.id} className={styles.contactCard}>
                    <div className="relative">
                      <div className={styles.contactStatus}>
                        <span className={`${styles.contactStatusBadge} ${m.status === 'NEW' ? styles.contactStatusNew : m.status === 'REPLIED' ? styles.contactStatusReplied : styles.contactStatusOther}`}>
                          {m.status}
                        </span>
                      </div>
                      <div>
                        <h3 className={styles.contactName}>{m.name}</h3>
                        <div className={styles.contactEmail}>{m.email}</div>
                        <div className={styles.contactPhone}>{m.phone}</div>
                        <div className={styles.contactDate}>{formatDate(m.date)}</div>
                        <div className="mt-4">
                          <div className={styles.contactMsgBox}>{m.message}</div>
                        </div>
                        <div className={styles.contactActions}>
                          <button onClick={() => replyToMessage(m.id)} className={styles.contactActionReply}>Reply</button>
                          <button onClick={() => markResolved(m.id)} className={styles.contactActionResolve}>Mark as Resolved</button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
          {/* EMI content is rendered above with filter controls; duplicate block removed */}
        </section>
      </div>

      {/* Floating chat button */}
      <button className={styles.chatButton}>
        <span className={styles.chatButtonIcon}>
          <MessageSquare size={16} color="#002" />
        </span>
        <span className={styles.chatButtonText}>Talk with Us</span>
      </button>
      
      {/* Footer (match site-wide footer) */}
      <Footer />
    </div>
  );
}
