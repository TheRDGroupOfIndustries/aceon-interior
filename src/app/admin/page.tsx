"use client";

import { Mail, Phone, Clock, MessageSquare } from "lucide-react";
import Footer from "@/components/footer";
import { useState, useRef, useEffect } from "react";

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
  // Sample product data for demo
  const sampleProducts = [
    {
      id: 'P1',
      name: 'Luxury King Size Bed',
      category: 'Bedroom',
      price: 45000,
      stock: 12,
      status: 'active',
      image: '/images/bed.jpg', // Attachments: first image
    },
    {
      id: 'P2',
      name: 'Modern Sofa Set',
      category: 'Living Room',
      price: 65000,
      stock: 8,
      status: 'active',
      image: '/images/sofa.jpg', // Attachments: second image
    },
    {
      id: 'P3',
      name: 'Executive Office Chair',
      category: 'Office',
      price: 25000,
      stock: 0,
      status: 'inactive',
      image: '/images/chair.jpg', // Attachments: third image
    },
  ];
  const [apps, setApps] = useState<AppItem[]>(sampleApps);
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

  const metrics = [
    { label: "TOTAL REVENUE", value: "₹12.5L", trend: "+15% this month" },
    { label: "ACTIVE ORDERS", value: "47", sub: "8 pending delivery" },
    { label: "NEW INQUIRIES", value: "23", sub: "12 awaiting response" },
    { label: "PRODUCTS", value: "156", sub: "12 categories" },
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
    <div className="min-h-screen bg-[#FCFCF9] text-[#13343B]">
      {/* Banner */}
      <div className="w-full bg-cover bg-center relative" style={{ backgroundImage: "url('/images/back.jpg')", height: 200 }}>
        {/* slightly reduced overlay opacity and banner height so page content doesn't get visually obscured */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(169,124,81,0.60)' }} />
        <div className="max-w-[1280px] mx-auto px-6 py-16 relative text-center">
          <h1 className="text-[56px] leading-tight font-serif text-white" style={{ textShadow: '0 6px 18px rgba(0,0,0,0.25)' }}>Executive Dashboard</h1>
          <p className="text-sm text-white opacity-90 mt-3">Sophisticated management suite for premium furniture operations</p>
        </div>
      </div>

      {/* add a visible gap below the banner so metrics/cards sit lower (matches mock) */}
      <div className="max-w-[1280px] mx-auto px-6 mt-8">
        {/* Metrics cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {metrics.map((m, idx) => (
            <div key={m.label} className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgba(19,52,59,0.04)] flex items-center justify-between border border-transparent hover:border-gray-100 transition">
              {/* Left: label, big value, small sub/trend */}
              <div className="flex-1">
                <div className="text-xs uppercase text-gray-400">{m.label}</div>
                <div className="text-[28px] font-semibold text-[#8b6e5b] mt-3">{m.value}</div>
                {m.trend && <div className="mt-2 text-sm text-teal-700">{m.trend}</div>}
                {m.sub && <div className="mt-1 text-sm text-gray-500">{m.sub}</div>}
              </div>

              {/* Right: colored icon box */}
              <div className="ml-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${idx === 0 ? 'bg-[#CFAE8D]' : idx === 1 ? 'bg-[#3B82F6]' : idx === 2 ? 'bg-[#F59E0B]' : 'bg-[#A78BFA]'}`}>
                  <div className="text-white text-xl">{idx === 0 ? '₹' : idx === 1 ? '📦' : idx === 2 ? '✉️' : '📁'}</div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Tabs and filters */}
        <div className="mt-6">
    <div className="bg-white rounded-2xl p--1 overflow-visible shadow-[0_8px_30px_rgba(19,52,59,0.04)] border border-transparent">
              <div ref={tabsContainerRef} className="max-w-[960px] flex items-center gap-6 px--8 py--3 relative justify-start">
                <button ref={(el: HTMLButtonElement | null) => { tabRefs.current['EMI'] = el }} onClick={() => setActiveTab('EMI')} className={`px-5 py-3 rounded-l-2xl inline-flex items-center gap-3 ${activeTab === 'EMI' ? 'bg-[#fff4ea] text-[#8b6e5b] font-medium' : 'text-gray-600'}`}>
                  <span>EMI Applications</span>
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${activeTab === 'EMI' ? 'bg-[#A97C51] text-white' : 'bg-[#eef2f7] text-[#6b7280]'}`}>3</span>
                </button>
                <button ref={(el: HTMLButtonElement | null) => { tabRefs.current['CONTACT'] = el }} onClick={() => setActiveTab('CONTACT')} className={`px-3 py-4 rounded-none text-sm inline-flex items-center gap-3 ${activeTab === 'CONTACT' ? 'bg-[#fff4ea] text-[#8b6e5b] font-medium' : 'text-gray-600'}`}>
                  <span>Contact Messages</span>
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === 'CONTACT' ? 'bg-[#A97C51] text-white' : 'bg-[#eef2f7] text-[#6b7280]'}`}>2</span>
                </button>

                <button ref={(el: HTMLButtonElement | null) => { tabRefs.current['PRODUCTS'] = el }} onClick={() => setActiveTab('PRODUCTS')} className={`px-5 py-3 rounded-none text-sm ${activeTab === 'PRODUCTS' ? 'bg-[#fff4ea] text-[#8b6e5b] font-medium' : 'text-gray-600'}`}>Products <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === 'PRODUCTS' ? 'bg-[#A97C51] text-white' : 'bg-[#eef2f7] text-[#6b7280]'}`}>3</span></button>
                <button ref={(el: HTMLButtonElement | null) => { tabRefs.current['ORDERS'] = el }} onClick={() => setActiveTab('ORDERS')} className={`px-5 py-3 rounded-none text-sm ${activeTab === 'ORDERS' ? 'bg-[#fff4ea] text-[#8b6e5b] font-medium' : 'text-gray-600'}`}>Orders <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === 'ORDERS' ? 'bg-[#A97C51] text-white' : 'bg-[#eef2f7] text-[#6b7280]'}`}>2</span></button>
                <button ref={(el: HTMLButtonElement | null) => { tabRefs.current['CATEGORY'] = el }} onClick={() => setActiveTab('CATEGORY')} className={`px-5 py-3 rounded-r-2xl text-sm ${activeTab === 'CATEGORY' ? 'bg-[#fff4ea] text-[#8b6e5b] font-medium' : 'text-gray-600'}`}>Category <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === 'CATEGORY' ? 'bg-[#A97C51] text-white' : 'bg-[#eef2f7] text-[#6b7280]'}`}>5</span></button>

                {/* single measured indicator positioned under the active tab */}
                {indicator && (
                  <span style={{ left: indicator.left - 10, width: indicator.width + 20, bottom: -2 }} className="absolute h-1 bg-[#A97C51] rounded-full z-10 shadow-[0_8px_20px_rgba(169,124,81,0.12)]" />
                )}
              </div>
          </div>
        </div>

          {activeTab === 'EMI' && (
            <>
          <div className="mt-4 flex gap-3 px-1 items-center">
            <button onClick={() => setEmiFilter('ALL')} className={`px-6 py-3 rounded-2xl font-medium shadow-sm ${emiFilter === 'ALL' ? 'bg-[#A97C51] text-white' : 'bg-white text-[#2b2b2b] border border-gray-200'}`}>All</button>
            <button onClick={() => setEmiFilter('PENDING')} className={`px-5 py-3 rounded-2xl font-medium shadow-sm ${emiFilter === 'PENDING' ? 'bg-[#A97C51] text-white' : 'bg-white text-[#2b2b2b] border border-gray-200'}`}>Pending</button>
            <button onClick={() => setEmiFilter('UNDER REVIEW')} className={`px-5 py-3 rounded-2xl font-medium shadow-sm ${emiFilter === 'UNDER REVIEW' ? 'bg-[#A97C51] text-white' : 'bg-white text-[#2b2b2b] border border-gray-200'}`}>Under review</button>
            <button onClick={() => setEmiFilter('APPROVED')} className={`px-5 py-3 rounded-2xl font-medium shadow-sm ${emiFilter === 'APPROVED' ? 'bg-[#A97C51] text-white' : 'bg-white text-[#2b2b2b] border border-gray-200'}`}>Approved</button>
            <button onClick={() => setEmiFilter('REJECTED')} className={`px-5 py-3 rounded-2xl font-medium shadow-sm ${emiFilter === 'REJECTED' ? 'bg-[#A97C51] text-white' : 'bg-white text-[#2b2b2b] border border-gray-200'}`}>Rejected</button>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-12 mt-6">
            <div className="space-y-5">
              {filteredApps.map((a) => (
                <article key={a.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-50">
                  <div className="relative">
                    <div className="absolute right-6 top-6">
                      <span className={`inline-flex items-center justify-center px-4 py-1.5 rounded-2xl text-[13px] font-semibold uppercase tracking-wide ${a.status === 'PENDING' ? 'bg-[#FFF7E6] text-[#A97C51] border border-[#F5DEC9]' : a.status === 'APPROVED' ? 'bg-[#E8F9F2] text-[#0E9B7A] border border-[#DFF3EA]' : 'bg-slate-100 text-slate-700'}`}>
                        {a.status}
                      </span>
                    </div>
                    <div className="w-full">
                      <div className="flex gap-6">
                        <div className="w-2/3">
                          <h4 className="text-[20px] font-playfair text-[#13343B]">{a.name}</h4>
                          <div className="text-sm text-[#8b6e5b] mt-2">
                            <div className="flex items-center gap-3"><Mail size={14} /> <span>{a.email}</span></div>
                            <div className="flex items-center gap-3 mt-1"><Phone size={14} /> <span>{a.phone}</span></div>
                            <div className="flex items-center gap-3 mt-1"><Clock size={14} /> <span>{formatDate(a.date)}</span></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-white rounded-md border" style={{ borderColor: 'rgba(94,82,64,0.04)' }}>
                          <div className="text-xs uppercase text-gray-400">Total Amount</div>
                          <div className="text-lg font-bold mt-1 text-[#8b6e5b]">{a.total}</div>
                          <div className="text-sm text-gray-500 mt-1">Down Payment: {a.down}</div>
                        </div>
                        <div className="p-4 bg-white rounded-md border" style={{ borderColor: 'rgba(94,82,64,0.04)' }}>
                          <div className="text-xs uppercase text-gray-400">Monthly EMI</div>
                          <div className="text-lg font-bold text-[#8b6e5b] mt-1">{a.emi}</div>
                          <div className="text-sm text-gray-500 mt-1">Tenure: {a.tenure}</div>
                        </div>
                        <div className="p-4 bg-white rounded-md border" style={{ borderColor: 'rgba(94,82,64,0.04)' }}>
                          <div className="text-xs uppercase text-gray-400">Monthly Income</div>
                          <div className="text-lg font-bold mt-1 text-[#8b6e5b]">{a.income}</div>
                          <div className="text-sm text-gray-500 mt-1">{a.employment}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-6">
                      <button onClick={() => toggleStatus(a.id)} className="bg-[#A97C51] text-white px-4 py-2 rounded-md shadow-sm">Update Status</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          </>
      )}

          {activeTab === 'PRODUCTS' && (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {sampleProducts.map(product => (
                <div key={product.id} className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgba(19,52,59,0.04)] border border-transparent hover:border-gray-100 transition flex flex-col">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-xl" />
                    <span className="absolute top-4 left-4 bg-[#A97C51] text-white text-xs font-semibold px-4 py-1 rounded-full">{product.category}</span>
                    <span className={`absolute top-4 right-4 px-4 py-1 rounded-full text-xs font-semibold ${product.status === 'active' ? 'bg-green-500 text-white' : 'bg-red-400 text-white'}`}>{product.status}</span>
                  </div>
                  <div className="mt-6 flex-1">
                    <h3 className="text-xl font-serif font-semibold mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#A97C51] text-2xl font-bold">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-700' : 'text-red-600'}`}>Stock: {product.stock}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 px-6 py-3 rounded-2xl bg-[#A97C51] text-white font-medium shadow-sm">Edit</button>
                    {product.status === 'active' ? (
                      <button className="flex-1 px-6 py-3 rounded-2xl bg-white text-[#A97C51] border border-gray-200 shadow-sm">Deactivate</button>
                    ) : (
                      <button className="flex-1 px-6 py-3 rounded-2xl bg-white text-[#A97C51] border border-gray-200 shadow-sm">Activate</button>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}

        {/* Content area: either Applications or Contact Messages depending on active tab */}
        <section className="mt-6">
          {activeTab === 'ORDERS' && (
            <div className="max-w-[150%] mx-auto bg-[#fcfcfc] rounded-2xl p-6 shadow-[0_8px_30px_rgba(19,52,59,0.04)] border border-[#f3e9dd] flex flex-col gap-8 mb-20">
              {[{
                id: 'ORD001',
                customer: 'Rajesh Gupta',
                email: 'rajesh.gupta@gmail.com',
                phone: '9876543210',
                date: '30 Oct 2025',
                products: ['Luxury King Size Bed', 'Bedside Table Set'],
                price: 55000,
                status: 'PROCESSING',
              }, {
                id: 'ORD002',
                customer: 'Meera Singh',
                email: 'meera.singh@gmail.com',
                phone: '8765432109',
                date: '29 Oct 2025',
                products: ['Modern Sofa Set', 'Coffee Table'],
                price: 75000,
                status: 'SHIPPED',
              }].map(order => (
                <div key={order.id} className="bg-white rounded-3xl p-7 shadow-[0_8px_30px_rgba(19,52,59,0.04)] border border-transparent">
                  <div className="flex justify-between items-start w-full">
                    <div>
                      <div className="text-xl font-serif font-semibold mb-1">Order #{order.id}</div>
                      <div className="text-base font-medium text-[#2b2b2b]">{order.customer}</div>
                      <div className="text-sm text-[#A97C51]">{order.email}</div>
                      <div className="text-sm text-gray-600">{order.phone}</div>
                      <div className="text-sm text-gray-400">{order.date}</div>
                    </div>
                    <div>
                      {order.status === 'PROCESSING' && (
                        <span className="px-4 py-2 rounded-2xl text-xs font-bold tracking-wide border border-[#3B82F6] bg-gradient-to-r from-[#eaf3ff] to-[#cbe2ff] text-[#1e40af]">PROCESSING</span>
                      )}
                      {order.status === 'SHIPPED' && (
                        <span className="px-4 py-1 rounded-4xl text-xs font-bold tracking-wide border border-[#a78bfa] bg-gradient-to-r from-[#f3eaff] to-[#e2cbff] text-[#6d28d9]">SHIPPED</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="text-xs font-bold text-gray-500 mb-2">PRODUCTS</div>
                    <div className="bg-[#ffffff] rounded-xl p-4 flex flex-col gap-2">
                      {order.products.map((prod, idx) => (
                        <div key={prod} className="flex items-center gap-2 text-base text-[#8b6e5b] font-medium">
                          <span className="w-2 h-2 rounded-full bg-[#A97C51] inline-block" />
                          {prod}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-3xl font-bold text-[#A97C51]">₹{order.price.toLocaleString('en-IN')}</div>
                    <button className="px-6 py-2 rounded-xl bg-[#A97C51] text-white font-medium shadow-sm">Update Status</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'CATEGORY' && (
            <div className="max-w-[1280px] mx-auto bg-[#fcfcfc] rounded-2xl px-7 pt-7 pb-7 shadow-[0_8px_30px_rgba(19,52,59,0.04)] border border-[#f3e9dd] flex flex-col gap-8 mb-20">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[{
                  name: 'Bedroom',
                  desc: 'Manage bedroom furniture and accessories with premium quality standards',
                  color: 'brown',
                }, {
                  name: 'Living Room',
                  desc: 'Manage living room furniture and accessories with premium quality standards',
                  color: 'blue',
                }, {
                  name: 'Dining Room',
                  desc: 'Manage dining room furniture and accessories with premium quality standards',
                  color: 'brown',
                }, {
                  name: 'Office',
                  desc: 'Manage office furniture and accessories with premium quality standards',
                  color: 'blue',
                }, {
                  name: 'Storage',
                  desc: 'Manage storage furniture and accessories with premium quality standards',
                  color: 'brown',
                }].map((cat, idx) => (
                  <div key={cat.name} className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgba(19,52,59,0.04)] border border-transparent transition-transform duration-200 hover:scale-105 hover:shadow-lg flex flex-col justify-between min-h-[260px]">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-serif font-semibold mb-2">{cat.name}</h3>
                      <span className={`w-12 h-12 rounded-full flex items-center justify-center ${cat.color === 'blue' ? 'bg-[#3B82F6]' : 'bg-[#A97C51]'} shadow-sm`}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4L4 10V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V10L12 4Z" stroke="white" strokeWidth="2" strokeLinejoin="round" fill="none" />
                        </svg>
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-6 mt-2">{cat.desc}</p>
                    <div className="flex gap-4 mt-auto">
                      <button className="px-8 py-3 rounded-2xl bg-[#A97C51] text-white font-medium shadow-sm">Edit</button>
                      <button className="px-8 py-3 rounded-2xl bg-white text-[#A97C51] border border-[#A97C51] font-medium shadow-sm">View Products</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'CONTACT' && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-12">
              <div className="space-y-5">
                {messages.map((m) => (
                  <article key={m.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-50">
                    <div className="relative">
                      <div className="absolute right-6 top-6">
                        <span className={`inline-flex items-center justify-center px-3 py-1.5 rounded-2xl text-sm font-semibold ${m.status === 'NEW' ? 'bg-[#FFF7E6] text-[#A97C51] border border-[#F5DEC9]' : m.status === 'REPLIED' ? 'bg-[#E8F9F2] text-[#0E9B7A] border border-[#DFF3EA]' : 'bg-slate-100 text-slate-700'}`}>
                          {m.status}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-[28px] font-playfair text-[#13343B]">{m.name}</h3>
                        <div className="text-sm text-[#8b6e5b] mt-1">{m.email}</div>
                        <div className="text-sm text-gray-700 mt-1">{m.phone}</div>
                        <div className="text-xs text-gray-400 mt-2">{formatDate(m.date)}</div>
                        <div className="mt-4">
                          <div className="bg-[#fbfbfb] border border-gray-100 rounded-lg p-4 text-gray-700">{m.message}</div>
                        </div>
                        <div className="mt-6 flex items-center gap-4">
                          <button onClick={() => replyToMessage(m.id)} className="bg-[#A97C51] text-white px-5 py-3 rounded-md shadow-sm">Reply</button>
                          <button onClick={() => markResolved(m.id)} className="px-5 py-3 rounded-md border border-[#d6c2aa] text-[#8b6e5b]">Mark as Resolved</button>
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
      <button className="fixed bottom-6 right-6 bg-black text-white px-4 py-3 rounded-full shadow-lg transform hover:scale-105 flex items-center gap-3">
        <span className="w-8 h-8 bg-[#08c9c9] rounded-full flex items-center justify-center">
          <MessageSquare size={16} color="#002" />
        </span>
        <span className="hidden sm:inline">Talk with Us</span>
      </button>
      
      {/* Footer (match site-wide footer) */}
      <Footer />
    </div>
  );
}
