import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, Home, Menu as MenuIcon, ArrowRight, Layers, 
  Inbox, Users, ListTodo, Rocket, GitBranch, 
  Activity, CheckCircle, XCircle, Clock, Search, 
  Briefcase, Monitor, Smartphone, CreditCard, 
  Settings, Database, Server, ChevronLeft, Target, Sparkles, TrendingUp
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';

// --- DATA DEFINITIONS ---

const COLORS = {
  navy: '#002B5C',
  darkBlue: '#003B73',
  primaryBlue: '#0057A8',
  secondaryBlue: '#007C91',
  yellow: '#F5B400',
  lightYellow: '#FFE3A0',
  bg: '#F5F7FA',
  textMain: '#1A202C',
  textMuted: '#718096',
  white: '#FFFFFF',
  status: {
    live: '#10B981',
    analysis: '#F59E0B',
    develop: '#3B82F6',
    preOp: '#8B5CF6'
  }
};

const MAIN_MENU_ITEMS = [
  { id: 'portfolio', title: 'پرتفوی محصولات', desc: 'نمای کلی محصولات و وضعیت آن‌ها', icon: Layers, preview: '۳۵ محصول فعال' },
  { id: 'pdi', title: 'درخواست‌ها و PDI', desc: 'تصویری از حجم و وضعیت درخواست‌های ورودی', icon: Inbox, preview: '۲٬۲۹۹ درخواست' },
  { id: 'committees', title: 'عملکرد کمیته‌های محصول', desc: 'بررسی تصمیمات و میزان اجرای مصوبات', icon: Users, preview: '۷۲ مصوبه (۶ماهه اول ۱۴۰۵)' },
  { id: 'backlog', title: 'وضعیت بک‌لاگ محصولات', desc: 'تصویری از حجم کار و پیشرفت اجرای محصولات', icon: ListTodo, preview: '۱٬۴۱۷ آیتم' },
  { id: 'initiatives', title: 'مهم‌ترین اقدامات در دست انجام', desc: 'پروژه‌ها و اقدامات راهبردی در مسیر آینده', icon: Rocket, preview: '۶ اقدام کلیدی' },
  { id: 'process', title: 'فرآیند توسعه محصول', desc: 'مسیر تبدیل نیاز و ایده به محصول', icon: GitBranch, preview: 'فرآیند ۳ گانه' },
];

const PORTFOLIO_DATA = {
  payment: {
    title: 'محصولات پرداخت',
    count: 6,
    icon: CreditCard,
    products: [
      { name: 'POS', status: 'Live', kpi: 'نرخ موفقیت پردازش تراکنش‌ها', nature: 'محصول کلیدی' },
      { name: 'IPG', status: 'Live', kpi: 'نرخ موفقیت پردازش تراکنش‌ها', nature: 'محصول کلیدی' },
      { name: 'Switch', status: 'Live', kpi: 'نرخ موفقیت پردازش تراکنش‌ها', nature: 'محصول کلیدی' },
      { name: 'Currency', status: 'Live', kpi: 'نرخ موفقیت پردازش تراکنش‌ها', nature: 'محصول نوآورانه' },
      { name: 'Close Loop Switch', status: 'Live', kpi: 'نرخ موفقیت پردازش تراکنش‌ها', nature: 'محصول عملیاتی' },
      { name: 'Poplay', status: 'Pre Operation', kpi: 'نرخ موفقیت پردازش تراکنش‌ها', nature: 'محصول نوآورانه' },
    ]
  },
  digital: {
    title: 'محصولات دیجیتال و اعتباری',
    count: 13,
    icon: Smartphone,
    products: [
      { name: 'IVA', status: 'Live', kpi: 'کاربر فعال ماهانه', nature: 'محصول استراتژیک' },
      { name: 'Iva Pay', status: 'In Analysis', kpi: 'نرخ درآمد به ازای هر کاربر', nature: 'محصول نوآورانه' },
      { name: 'Pulse', status: 'In Develop', kpi: 'کاربر فعال ماهانه', nature: 'محصول استراتژیک' },
      { name: 'My Station', status: 'Live', kpi: 'کاربر فعال ماهانه', nature: 'محصول استراتژیک' },
      { name: 'Wallet', status: 'Live', kpi: 'کاربر فعال ماهانه', nature: 'محصول استراتژیک' },
      { name: 'Digital Rial', status: 'Live', kpi: 'نرخ موفقیت پردازش تراکنش‌ها', nature: 'محصول نوآورانه' },
      { name: 'Melli Wallet', status: 'Live', kpi: 'نرخ موفقیت پردازش تراکنش‌ها', nature: 'محصول نوآورانه' },
      { name: 'BNPL', status: 'Live', kpi: 'نرخ موفقیت پردازش تراکنش‌ها', nature: 'محصول نوآورانه' },
      { name: 'Credit Payment', status: 'Live', kpi: 'نرخ موفقیت پردازش تراکنش‌ها', nature: 'محصول نوآورانه' },
      { name: 'Kahroba', status: 'Live', kpi: 'نرخ موفقیت پردازش تراکنش‌ها', nature: 'محصول نوآورانه' },
      { name: 'Mirshetab', status: 'Live', kpi: 'نرخ موفقیت پردازش تراکنش‌ها', nature: 'محصول نوآورانه' },
      { name: 'Overdraft', status: 'In Analysis', kpi: 'نرخ درآمد به ازای هر کاربر', nature: 'محصول نوآورانه' },
      { name: 'In App Payment', status: 'In Develop', kpi: 'نرخ موفقیت پردازش تراکنش‌ها', nature: 'محصول نوآورانه' },
    ]
  },
  acceptance: {
    title: 'محصولات پذیرندگی',
    count: 6,
    icon: Monitor,
    products: [
      { name: 'Shahin DMS', status: 'Live', kpi: 'نرخ تأمین نیازهای گزارش‌دهی', nature: 'محصول استراتژیک' },
      { name: 'MMP', status: 'Live', kpi: 'نرخ تبدیل متقاضی به پذیرنده', nature: 'محصول توانمندساز' },
      { name: 'Mportal', status: 'Live', kpi: 'نرخ موفقیت درخواست‌های شاپرکی', nature: 'محصول توانمندساز' },
      { name: 'PSM', status: 'Live', kpi: 'نرخ خطاهای کاربری', nature: 'محصول توانمندساز' },
      { name: 'TMS', status: 'Live', kpi: 'نرخ موفقیت استقرار نسخه هدف', nature: 'محصول عملیاتی' },
      { name: 'My Sadad', status: 'In Analysis', kpi: 'نرخ رضایت کاربران', nature: 'محصول توانمندساز' },
    ]
  },
  valueAdded: {
    title: 'سرویس‌ها و محصولات ارزش افزوده',
    count: 10,
    icon: Briefcase,
    products: [
      { name: 'Customer Gateway', status: 'Live', kpi: 'نرخ پاسخگویی موفق به درخواست‌ها', nature: 'محصول عملیاتی' },
      { name: 'Sadad Naji', status: 'Live', kpi: 'نرخ پاسخگویی موفق به درخواست‌ها', nature: 'محصول عملیاتی' },
      { name: 'User Account', status: 'Live', kpi: 'نرخ پاسخگویی موفق به درخواست‌ها', nature: 'محصول عملیاتی' },
      { name: 'Notification', status: 'Live', kpi: 'نرخ پاسخگویی موفق به درخواست‌ها', nature: 'محصول عملیاتی' },
      { name: 'Post Inquiry', status: 'Live', kpi: 'نرخ پاسخگویی موفق به درخواست‌ها', nature: 'محصول عملیاتی' },
      { name: 'Shaparak Inquiry', status: 'Live', kpi: 'نرخ پاسخگویی موفق به درخواست‌ها', nature: 'محصول عملیاتی' },
      { name: 'Fuel Services', status: 'Live', kpi: 'نرخ پاسخگویی موفق به درخواست‌ها', nature: 'محصول عملیاتی' },
      { name: 'Charge & Bill', status: 'Live', kpi: 'نرخ موفقیت پردازش تراکنش‌ها', nature: 'محصول عملیاتی' },
      { name: 'Charge Switch', status: 'In Develop', kpi: 'نرخ موفقیت پردازش تراکنش‌ها', nature: 'محصول استراتژیک' },
      { name: 'Refund', status: 'Live', kpi: 'نرخ موفقیت پردازش تراکنش‌ها', nature: 'محصول عملیاتی' },
    ]
  }
};

const PDI_DATA = [
  { name: 'انجام شده (Done)', value: 1068, color: '#10B981' },
  { name: 'بسته شده (Closed)', value: 461, color: '#34D399' },
  { name: 'در حال انجام (In Progress)', value: 409, color: '#3B82F6' },
  { name: 'لغو شده (Canceled)', value: 107, color: '#EF4444' },
  { name: 'مرحله (Stage)', value: 101, color: '#F59E0B' },
  { name: 'در انتظار مشتری', value: 61, color: '#8B5CF6' },
  { name: 'محصول (Product)', value: 22, color: '#6366F1' },
  { name: 'باز (Open)', value: 20, color: '#EC4899' },
  { name: 'رد شده (Rejected)', value: 16, color: '#9CA3AF' },
  { name: 'سایر موارد', value: 5, color: '#D1D5DB' },
  { name: 'نامشخص / بدون دسته‌بندی', value: 29, color: '#E5E7EB' },
];

const COMMITTEES_DATA = [
  { year: '۱۴۰۳', hours: 1892, approvals: 415, completed: 314, inProgress: 50, notCompleted: 41 },
  { year: '۱۴۰۴', hours: 720, approvals: 247, completed: 195, inProgress: 36, notCompleted: 16 },
  { year: '۶ ماهه اول ۱۴۰۵', hours: 280, approvals: 72, completed: 27, inProgress: 29, notCompleted: 16 },
];

const BACKLOG_DATA = [
  { name: 'Database', completed: 195, inProgress: 40, unstarted: 44, canceled: 45, total: 324, rate: '60.2%' },
  { name: 'POS', completed: 153, inProgress: 57, unstarted: 62, canceled: 11, total: 283, rate: '54.1%' },
  { name: 'Portal', completed: 106, inProgress: 49, unstarted: 21, canceled: 19, total: 195, rate: '54.4%' },
  { name: 'MMP', completed: 100, inProgress: 40, unstarted: 14, canceled: 32, total: 186, rate: '53.8%' },
  { name: 'PSM SAMBAD', completed: 86, inProgress: 74, unstarted: 2, canceled: 9, total: 171, rate: '50.3%' },
  { name: 'Services', completed: 67, inProgress: 28, unstarted: 1, canceled: 8, total: 104, rate: '64.4%' },
  { name: 'PSM', completed: 43, inProgress: 15, unstarted: 17, canceled: 5, total: 80, rate: '53.8%' },
  { name: 'Shahin DMS', completed: 6, inProgress: 40, unstarted: 7, canceled: 0, total: 53, rate: '11.3%' },
  { name: 'Shaparak WS', completed: 10, inProgress: 4, unstarted: 0, canceled: 7, total: 21, rate: '47.6%' },
];

const INITIATIVES_DATA = [
  { id: 1, title: 'یکپارچه‌سازی سامانه‌های بک‌آفیس', desc: 'در قالب پلتفرم جامع «سداد من»', category: 'Platform & Infrastructure', icon: Database },
  { id: 2, title: 'عملیاتی‌سازی پروژه «پل پی»', desc: 'توسعه زیرساخت پرداخت‌های نوین', category: 'New Business Lines', icon: CreditCard },
  { id: 3, title: 'انتشار نسخه جدید «پالس»', desc: 'ارتقاء تجربه کاربری و افزودن قابلیت‌های پیشرفته', category: 'Digital Transformation', icon: Smartphone },
  { id: 4, title: 'ایجاد بیزنس‌لاین «تسهیلات روزانه»', desc: 'توسعه محصولات اعتباری خرد و سریع', category: 'New Business Lines', icon: TrendingUp },
  { id: 5, title: 'راه‌اندازی لاین جدید KYC', desc: 'احراز هویت دیجیتال یکپارچه و هوشمند', category: 'Platform & Infrastructure', icon: Users },
  { id: 6, title: 'عملیاتی‌سازی «سوییچ شارژ»', desc: 'با قابلیت تبدیل شدن به ارائه‌دهنده سرویس', category: 'Platform & Infrastructure', icon: Server },
];


const typography = {
  h1: "text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight",
  h2: "text-3xl md:text-4xl font-bold",
  h3: "text-2xl md:text-3xl font-semibold",
  h4: "text-xl font-semibold",
  body: "text-base md:text-lg font-normal leading-relaxed",
  small: "text-sm font-normal",
  numberLg: "text-5xl md:text-7xl font-bold font-sans",
};

const persianNumber = (num: number | string) => {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, x => farsiDigits[parseInt(x)]);
};

const formatNumber = (num: number) => {
  return persianNumber(num.toLocaleString('en-US'));
};

const StatusBadge = ({ status }: { status: string }) => {
  let config = { label: 'نامشخص', color: 'bg-gray-200 text-gray-800' };
  switch(status) {
    case 'Live': config = { label: 'عملیاتی', color: 'bg-emerald-100 text-emerald-800 border border-emerald-200' }; break;
    case 'In Analysis': config = { label: 'در تحلیل', color: 'bg-amber-100 text-amber-800 border border-amber-200' }; break;
    case 'In Develop': config = { label: 'در توسعه', color: 'bg-blue-100 text-blue-800 border border-blue-200' }; break;
    case 'Pre Operation': config = { label: 'پیش از بهره‌برداری', color: 'bg-purple-100 text-purple-800 border border-purple-200' }; break;
  }
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${config.color} flex items-center gap-1.5`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.color.split(' ')[0].replace('100', '500')}`}></span>
      {config.label}
    </span>
  );
};

const NatureBadge = ({ nature }: { nature: string }) => {
  return (
    <span className="px-2 py-1 text-[10px] sm:text-xs font-medium bg-gray-100 text-gray-600 rounded-md border border-gray-200">
      {nature}
    </span>
  );
};

const Header = ({ breadcrumbs, onNavigate, onHome }: { breadcrumbs: any[], onNavigate: (p: string) => void, onHome: () => void }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#002B5C] to-[#0057A8] flex items-center justify-center shadow-inner">
           <Layers className="text-[#F5B400] w-6 h-6" />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-[#002B5C] font-bold text-lg leading-none mb-1">مدیریت محصول</h1>
          <p className="text-gray-500 text-xs">ارائه عملکرد و چشم‌انداز</p>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-2 text-sm text-gray-500 flex-1 justify-center px-4">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <button 
              onClick={() => crumb.path && onNavigate(crumb.path)}
              className={`hover:text-[#0057A8] transition-colors ${index === breadcrumbs.length - 1 ? 'font-semibold text-[#002B5C]' : ''} ${!crumb.path ? 'cursor-default' : ''}`}
            >
              {crumb.label}
            </button>
            {index < breadcrumbs.length - 1 && <ChevronLeft className="w-4 h-4 opacity-50" />}
          </React.Fragment>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        {breadcrumbs.length > 1 && (
          <button 
            onClick={() => onNavigate(breadcrumbs[breadcrumbs.length - 2].path || 'menu')}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span className="hidden sm:inline">بازگشت</span>
          </button>
        )}
        <button 
          onClick={onHome}
          className="p-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          title="خانه"
        >
          <Home className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

const PortfolioSection = ({ onNavigate }: { onNavigate: (p: string) => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 md:p-10 max-w-7xl mx-auto"
    >
      <div className="mb-10 text-center">
        <h2 className={`text-[#002B5C] ${typography.h2} mb-4`}>پرتفوی محصولات سداد</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">نمایی یکپارچه از اکوسیستم محصولات در چهار دسته‌بندی اصلی</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {Object.entries(PORTFOLIO_DATA).map(([key, category]: any, index) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={key}
              whileHover={{ scale: 1.02, translateY: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate(`portfolio/${key}`)}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 transition-all text-right flex flex-col items-start relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0057A8]/5 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              
              <div className="flex justify-between items-start w-full mb-6">
                <div className="p-3 bg-blue-50 text-[#0057A8] rounded-xl">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <span className="block text-3xl font-bold text-[#002B5C]">{persianNumber(category.count)}</span>
                  <span className="text-sm text-gray-500">محصول</span>
                </div>
              </div>
              
              <h3 className={`text-[#002B5C] ${typography.h3} mb-2`}>{category.title}</h3>
              <div className="flex items-center gap-2 text-sm font-medium text-[#0057A8] mt-4">
                مشاهده محصولات <ChevronLeft className="w-4 h-4" />
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  );
};

const CategoryDetailView = ({ categoryKey, onBack }: { categoryKey: string, onBack: () => void }) => {
  const category = (PORTFOLIO_DATA as any)[categoryKey];
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  if (!category) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 md:p-10 max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-gray-200 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <category.icon className="w-8 h-8 text-[#0057A8]" />
            <h2 className={`text-[#002B5C] ${typography.h2}`}>{category.title}</h2>
          </div>
          <p className="text-gray-500">فهرست محصولات این دسته‌بندی</p>
        </div>
        <div className="mt-4 md:mt-0 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
          <span className="text-gray-500 text-sm ml-2">تعداد کل:</span>
          <span className="font-bold text-[#002B5C] text-lg">{persianNumber(category.count)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.products.map((product: any, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => setSelectedProduct(product)}
            className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 cursor-pointer transition-all flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-[#002B5C] text-lg english-font tracking-wide" dir="ltr">{product.name}</h4>
              <StatusBadge status={product.status} />
            </div>
            <div className="mt-auto pt-4 flex justify-between items-end border-t border-gray-50">
               <NatureBadge nature={product.nature} />
               <ChevronLeft className="w-5 h-5 text-gray-300" />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 left-4 text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full p-1"
              >
                <XCircle className="w-6 h-6" />
              </button>
              
              <div className="mb-6">
                <span className="text-xs font-semibold text-gray-500 mb-2 block">{category.title}</span>
                <h3 className="text-3xl font-extrabold text-[#002B5C] english-font tracking-wide" dir="ltr">{selectedProduct.name}</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <span className="text-sm text-gray-500 block mb-1">وضعیت فعلی</span>
                  <StatusBadge status={selectedProduct.status} />
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <span className="text-sm text-gray-500 block mb-1">شاخص کلیدی عملکرد (KPI)</span>
                  <p className="font-semibold text-gray-800">{selectedProduct.kpi}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <span className="text-sm text-gray-500 block mb-1">ماهیت محصول</span>
                  <NatureBadge nature={selectedProduct.nature} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const PDISection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-10 max-w-7xl mx-auto h-full"
    >
      <div className="mb-8">
        <h2 className={`text-[#002B5C] ${typography.h2} mb-2`}>درخواست‌ها و PDI</h2>
        <p className="text-gray-500">تصویری از حجم و وضعیت درخواست‌های ورودی</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-gradient-to-br from-[#002B5C] to-[#0057A8] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                <Inbox className="w-48 h-48 -mr-10 -mt-10" />
             </div>
             <h3 className="text-blue-100 font-medium mb-2 text-lg">کل درخواست‌های ثبت شده</h3>
             <div className={`${typography.numberLg} text-[#F5B400] mb-4`}>{formatNumber(2299)}</div>
             <div className="space-y-2 mt-6">
               <div className="flex justify-between items-center bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/10">
                 <span className="text-sm">نرخ تکمیل / بسته‌شده</span>
                 <span className="font-bold">~۶۶.۶٪</span>
               </div>
               <div className="flex justify-between items-center bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/10">
                 <span className="text-sm">در حال انجام / فعال</span>
                 <span className="font-bold">~۱۷.۸٪</span>
               </div>
             </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3 text-amber-800 text-sm">
            <Search className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-500" />
            <p><strong>توجه:</strong> مجموع آیتم‌های دسته‌بندی شده ۲٬۲۷۰ مورد است. ۲۹ مورد به عنوان «سایر / نامشخص» برای تطبیق با کل (۲٬۲۹۹) در نظر گرفته شده است.</p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-bold text-[#002B5C] mb-6">توزیع وضعیت درخواست‌ها</h3>
          <div className="flex-1 min-h-[400px] flex flex-col md:flex-row items-center">
            
            <div className="w-full md:w-1/2 h-64 md:h-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PDI_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {PDI_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value) => [formatNumber(value as number), 'تعداد']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ textAlign: 'right' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
                <span className="text-gray-400 text-sm">تعداد کل</span>
                <span className="text-2xl font-bold text-[#002B5C]">{formatNumber(2299)}</span>
              </div>
            </div>

            <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mt-6 md:mt-0 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {PDI_DATA.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-700 truncate max-w-[120px]" title={item.name}>{item.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{formatNumber(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FunnelStage = ({ label, value, maxVal, colorClass }: { label: string, value: number, maxVal: number, colorClass: string }) => {
  const percentage = Math.max((value / maxVal) * 100, 20); 
  
  return (
    <div className="flex flex-col items-center w-full mb-1 group relative">
      <div 
        className={`h-12 flex items-center justify-center rounded-sm transition-all duration-500 ease-in-out ${colorClass} text-white font-bold text-lg shadow-sm w-full clip-trapezoid hover:brightness-110`}
        style={{ width: `${percentage}%`, minWidth: '120px' }}
      >
        {persianNumber(value)}
      </div>
      <div className="text-xs text-gray-500 mt-1 opacity-80 group-hover:opacity-100 transition-opacity absolute -left-24 top-1/2 -translate-y-1/2 whitespace-nowrap text-left hidden lg:block">
        {label}
      </div>
    </div>
  );
};

const CommitteesSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-10 max-w-7xl mx-auto"
    >
      <div className="mb-10 text-center">
        <h2 className={`text-[#002B5C] ${typography.h2} mb-4`}>عملکرد کمیته‌های محصول</h2>
        <p className="text-gray-600">روند تصمیم‌گیری و اجرای مصوبات طی سال‌های گذشته</p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          <div className="hidden lg:block absolute top-[120px] left-0 w-full h-[1px] bg-gray-200 z-0 border-dashed border-t"></div>
          <div className="hidden lg:block absolute top-[180px] left-0 w-full h-[1px] bg-gray-200 z-0 border-dashed border-t"></div>
          
          {COMMITTEES_DATA.map((yearData, idx) => {
            const maxVal = yearData.hours;
            const isLatest = idx === 2;
            
            return (
              <div key={idx} className={`flex flex-col items-center relative z-10 ${isLatest ? 'bg-blue-50/50 p-6 rounded-2xl ring-1 ring-blue-100' : 'p-6'}`}>
                {isLatest && (
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-[#F5B400] text-[#002B5C] text-xs font-bold px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
                    دوره جاری
                  </div>
                )}
                
                <h3 className={`text-2xl font-bold mb-8 ${isLatest ? 'text-[#0057A8]' : 'text-[#002B5C]'}`}>
                  {yearData.year}
                </h3>
                
                <div className="w-full flex flex-col items-center space-y-2">
                  <div className="w-full relative group">
                    <div className="text-center text-xs text-gray-500 mb-1 lg:hidden">مجموع نفر ساعت</div>
                    <FunnelStage label="مجموع نفر ساعت" value={yearData.hours} maxVal={maxVal} colorClass="bg-[#F5B400]/40 text-amber-900 border-b border-white" />
                  </div>
                  
                  <div className="w-full relative">
                    <div className="text-center text-xs text-gray-500 mb-1 mt-3 lg:hidden">تعداد کل مصوبات</div>
                    <FunnelStage label="تعداد مصوبات" value={yearData.approvals} maxVal={maxVal} colorClass="bg-[#002B5C] border-b border-white" />
                  </div>
                  
                  <div className="w-full relative">
                     <div className="text-center text-xs text-gray-500 mb-1 mt-2 lg:hidden">انجام شده</div>
                    <FunnelStage label="انجام شد" value={yearData.completed} maxVal={maxVal} colorClass="bg-[#003B73] border-b border-white" />
                  </div>
                  
                  <div className="w-full relative">
                     <div className="text-center text-xs text-gray-500 mb-1 mt-2 lg:hidden">در دست اقدام</div>
                    <FunnelStage label="در دست اقدام" value={yearData.inProgress} maxVal={maxVal} colorClass="bg-[#0057A8] border-b border-white" />
                  </div>
                  
                  <div className="w-full relative">
                     <div className="text-center text-xs text-gray-500 mb-1 mt-2 lg:hidden">انجام نشده</div>
                    <FunnelStage label="انجام نشده" value={yearData.notCompleted} maxVal={maxVal} colorClass="bg-[#007C91] border-b border-white" />
                  </div>
                </div>
                
                <div className="mt-8 text-center bg-gray-50 p-3 rounded-lg w-full text-sm text-gray-600 border border-gray-100">
                  <span className="block text-xs text-gray-400 mb-1">نرخ تکمیل مصوبات</span>
                  <span className="font-bold text-lg text-[#002B5C]">{persianNumber(Math.round((yearData.completed / yearData.approvals) * 100))}٪</span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100 text-sm text-gray-500 text-center flex items-center justify-center gap-2">
          <Clock className="w-4 h-4" />
          <span>مجموع نفر ساعت بر اساس میانگین ۲۰ نفر حضور در هر جلسه محاسبه شده است.</span>
        </div>
      </div>
    </motion.div>
  );
};

const AlertCircleIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const BacklogSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-10 max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
        <div>
          <h2 className={`text-[#002B5C] ${typography.h2} mb-2`}>وضعیت بک‌لاگ محصولات</h2>
          <p className="text-gray-500">تصویری از حجم کار و پیشرفت اجرای محصولات در سامانه‌های مختلف</p>
        </div>
        
        <div className="flex gap-4 mt-4 md:mt-0">
          <div className="bg-white px-5 py-3 rounded-xl border border-gray-200 shadow-sm text-center">
            <span className="text-gray-500 text-xs block mb-1">کل تسک‌ها</span>
            <span className="font-bold text-[#002B5C] text-2xl">{formatNumber(1417)}</span>
          </div>
          <div className="bg-[#002B5C] px-5 py-3 rounded-xl shadow-sm text-center">
            <span className="text-blue-200 text-xs block mb-1">نرخ تکمیل کل</span>
            <span className="font-bold text-[#F5B400] text-2xl">{persianNumber(54.1)}٪</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 overflow-hidden">
        <h3 className="text-lg font-bold text-[#002B5C] mb-6">وضعیت تسک‌ها به تفکیک محصول / سامانه</h3>
        
        <div className="h-[500px] w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={BACKLOG_DATA}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#4B5563', fontSize: 12, fontWeight: 600 }}
                width={110}
              />
              <RechartsTooltip 
                cursor={{fill: '#F3F4F6'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ textAlign: 'left' }}
                labelStyle={{ fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              
              <Bar dataKey="completed" name="Completed" stackId="a" fill="#10B981" radius={[0, 0, 0, 4]} barSize={24} />
              <Bar dataKey="inProgress" name="In Progress" stackId="a" fill="#3B82F6" />
              <Bar dataKey="unstarted" name="Unstarted" stackId="a" fill="#F59E0B" />
              <Bar dataKey="canceled" name="Canceled" stackId="a" fill="#EF4444" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
          <div>
            <h4 className="font-bold text-emerald-900 text-sm">بالاترین نرخ تکمیل</h4>
            <p className="text-emerald-700 text-sm mt-1">سامانه Services با <strong>{persianNumber(64.4)}٪</strong> نرخ تکمیل، بهترین عملکرد را در اتمام وظایف داشته است.</p>
          </div>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-start gap-3">
          <AlertCircleIcon className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-bold text-amber-900 text-sm">بیشترین حجم کار فعال</h4>
            <p className="text-amber-700 text-sm mt-1">سامانه PSM SAMBAD با <strong>{persianNumber(74)}</strong> تسک در حال انجام، بیشترین حجم عملیاتی فعلی را دارد.</p>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start gap-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1 h-full bg-red-400"></div>
          <Activity className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <h4 className="font-bold text-red-900 text-sm">نیازمند توجه (Shahin DMS)</h4>
            <p className="text-red-700 text-sm mt-1">نرخ تکمیل تنها <strong>{persianNumber(11.3)}٪</strong> است و بخش عمده وظایف ({persianNumber(40)} مورد) در وضعیت در حال انجام انباشته شده‌اند.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const InitiativesSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-10 max-w-7xl mx-auto"
    >
      <div className="mb-12 text-center">
        <h2 className={`text-[#002B5C] ${typography.h2} mb-4`}>مهم‌ترین اقدامات در دست انجام</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">پروژه‌های کلیدی و اقدامات راهبردی مدیریت محصول در مسیر آینده</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-blue-200 to-transparent -translate-y-1/2 z-0"></div>

        {INITIATIVES_DATA.map((item: any, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-blue-300 transition-all z-10 relative overflow-hidden group h-full flex flex-col"
          >
            <div className="absolute -top-4 -left-4 text-8xl font-black text-gray-50 opacity-50 group-hover:text-blue-50 transition-colors pointer-events-none english-font" dir="ltr">
              {item.id}
            </div>
            
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-[#002B5C] text-white flex items-center justify-center shrink-0 shadow-inner group-hover:bg-[#0057A8] transition-colors">
                <item.icon className="w-6 h-6 text-[#F5B400]" />
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                {item.category}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-[#002B5C] mb-3 relative z-10 leading-tight">
              {item.title}
            </h3>
            
            <p className="text-gray-600 text-sm leading-relaxed relative z-10 mt-auto pt-4 border-t border-gray-50">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const ProcessArrow = () => (
  <div className="flex-1 flex items-center px-2 z-0">
    <div className="w-full h-0.5 bg-gray-300 relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-l-2 border-gray-400 transform -rotate-45"></div>
    </div>
  </div>
);

const ProcessStep = ({ icon: Icon, title, desc, color }: any) => {
  const colorMap: any = {
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    navy: 'bg-indigo-100 text-[#002B5C] border-indigo-200',
    indigo: 'bg-violet-100 text-violet-700 border-violet-200',
    emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-100 text-amber-700 border-amber-200',
    red: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <div className="flex flex-col items-center text-center w-40 z-10 relative group">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 mb-3 bg-white shadow-sm transition-transform group-hover:scale-110 ${colorMap[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="font-bold text-sm text-[#002B5C] mb-1">{title}</h4>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  );
};

const ProcessSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-10 max-w-7xl mx-auto h-full flex flex-col"
    >
      <div className="mb-8">
        <h2 className={`text-[#002B5C] ${typography.h2} mb-2`}>فرآیند توسعه محصول</h2>
        <p className="text-gray-500">مسیر یکپارچه تبدیل نیاز و ایده به محصول قابل ارائه (خلاصه مدیریتی)</p>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto custom-scrollbar p-6 relative">
        
        <div className="min-w-[900px] h-full flex flex-col justify-around py-4">
          
          <div className="relative mb-12">
             <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#F5B400] text-white flex items-center justify-center font-bold text-sm shadow-md z-10">۱</div>
             <div className="ml-8 bg-gray-50 rounded-xl border border-gray-200 p-4 relative">
                <h3 className="absolute -top-3 right-6 bg-white px-3 text-sm font-bold text-[#002B5C] border border-gray-200 rounded-full">توسعه محصول جدید</h3>
                
                <div className="flex items-center justify-between mt-4">
                  <ProcessStep icon={Search} title="کشف و تحلیل" desc="نیازسنجی و راهکار" color="blue" />
                  <ProcessArrow />
                  <ProcessStep icon={Settings} title="شفاف‌سازی و PRD" desc="مستندات و تیم فنی" color="navy" />
                  <ProcessArrow />
                  <ProcessStep icon={GitBranch} title="توسعه و تست" desc="پیاده‌سازی و ارزیابی" color="indigo" />
                  <ProcessArrow />
                  <ProcessStep icon={Rocket} title="عملیاتی‌سازی" desc="ارائه به مشتری و رشد" color="emerald" />
                </div>
             </div>
          </div>

          <div className="relative mb-12">
             <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#F5B400] text-white flex items-center justify-center font-bold text-sm shadow-md z-10">۲</div>
             <div className="ml-8 bg-gray-50 rounded-xl border border-gray-200 p-4 relative">
                <h3 className="absolute -top-3 right-6 bg-white px-3 text-sm font-bold text-[#002B5C] border border-gray-200 rounded-full">بهبود و توسعه ویژگی‌ها</h3>
                
                <div className="flex items-center justify-between mt-4">
                  <ProcessStep icon={Activity} title="بازخورد و آنالیز" desc="طرح بهبود محصول" color="amber" />
                  <ProcessArrow />
                  <ProcessStep icon={Users} title="جلسه فنی و Jira" desc="ثبت درخواست توسعه" color="navy" />
                  <ProcessArrow />
                  <ProcessStep icon={CheckCircle} title="تست محیط عملیاتی" desc="بررسی کامل ویژگی" color="indigo" />
                  <ProcessArrow />
                  <ProcessStep icon={Smartphone} title="انتشار و اطلاع‌رسانی" desc="ارائه به ذینفعان" color="emerald" />
                </div>
             </div>
          </div>

          <div className="relative">
             <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#F5B400] text-white flex items-center justify-center font-bold text-sm shadow-md z-10">۳</div>
             <div className="ml-8 bg-gray-50 rounded-xl border border-gray-200 p-4 relative">
                <h3 className="absolute -top-3 right-6 bg-white px-3 text-sm font-bold text-[#002B5C] border border-gray-200 rounded-full">رفع باگ (Bug Fix)</h3>
                
                <div className="flex items-center justify-between mt-4">
                  <ProcessStep icon={XCircle} title="تشخیص و گزارش" desc="شفاف‌سازی باگ" color="red" />
                  <ProcessArrow />
                  <ProcessStep icon={ListTodo} title="ثبت و ارجاع" desc="درخواست رفع مشکل" color="navy" />
                  <ProcessArrow />
                  <ProcessStep icon={Settings} title="رفع فنی / عملیاتی" desc="توسعه یا تنظیمات" color="indigo" />
                  <ProcessArrow />
                  <ProcessStep icon={CheckCircle} title="نصب و اطلاع‌رسانی" desc="تاییدیه نهایی" color="emerald" />
                </div>
             </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default function ExecutiveApp() {
  const [currentView, setCurrentView] = useState('cover');
  const [breadcrumbs, setBreadcrumbs] = useState<any[]>([{ label: 'خانه', path: 'menu' }]);

  const navigateTo = (path: string) => {
    setCurrentView(path);
    
    const newBreadcrumbs: any[] = [{ label: 'خانه', path: 'menu' }];
    
    if (path === 'menu') {
    } else if (path.startsWith('portfolio/')) {
      newBreadcrumbs.push({ label: 'پرتفوی محصولات', path: 'portfolio' });
      const categoryKey = path.split('/')[1];
      if ((PORTFOLIO_DATA as any)[categoryKey]) {
        newBreadcrumbs.push({ label: (PORTFOLIO_DATA as any)[categoryKey].title, path: null });
      }
    } else {
      const menuItem = MAIN_MENU_ITEMS.find(item => item.id === path);
      if (menuItem) {
        newBreadcrumbs.push({ label: menuItem.title, path: null });
      }
    }
    
    setBreadcrumbs(newBreadcrumbs);
  };

  const handleHome = () => navigateTo('menu');

  const renderView = () => {
    switch (currentView) {
      case 'menu':
        return (
          <motion.div 
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen flex flex-col justify-center"
          >
            <div className="mb-12 text-center">
              <h2 className={`text-[#002B5C] ${typography.h1} mb-4`}>منوی ارائه مدیران</h2>
              <p className="text-gray-600 text-lg">لطفاً برای مشاهده جزئیات، بخش مورد نظر را انتخاب کنید</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MAIN_MENU_ITEMS.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigateTo(item.id)}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 transition-all text-right flex flex-col relative overflow-hidden group"
                >
                  <div className="absolute -left-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <item.icon className="w-40 h-40" />
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#002B5C] to-[#0057A8] text-white flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all">
                      <item.icon className="w-6 h-6 text-[#F5B400]" />
                    </div>
                    <span className="text-gray-300 font-bold text-2xl english-font" dir="ltr">0{idx + 1}</span>
                  </div>
                  
                  <h3 className={`text-[#002B5C] ${typography.h3} mb-2 line-clamp-1`}>{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 flex-1">{item.desc}</p>
                  
                  <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
                    <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{item.preview}</span>
                    <ChevronLeft className="w-5 h-5 text-[#0057A8]" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );
      case 'portfolio':
        return <PortfolioSection key="portfolio" onNavigate={navigateTo} />;
      case 'portfolio/payment':
      case 'portfolio/digital':
      case 'portfolio/acceptance':
      case 'portfolio/valueAdded':
        return <CategoryDetailView key={currentView} categoryKey={currentView.split('/')[1]} onBack={() => navigateTo('portfolio')} />;
      case 'pdi':
        return <PDISection key="pdi" />;
      case 'committees':
        return <CommitteesSection key="committees" />;
      case 'backlog':
        return <BacklogSection key="backlog" />;
      case 'initiatives':
        return <InitiativesSection key="initiatives" />;
      case 'process':
        return <ProcessSection key="process" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans text-right" dir="rtl" style={{ fontFamily: 'Vazirmatn, Tahoma, "Segoe UI", system-ui, sans-serif' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .english-font { font-family: 'Inter', system-ui, sans-serif; }
        .clip-trapezoid { clip-path: polygon(5% 0, 95% 0, 100% 100%, 0% 100%); }
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #a8a8a8; }
      `}} />

      <AnimatePresence mode="wait">
        {currentView === 'cover' ? (
          <motion.div 
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="h-screen w-full bg-gradient-to-br from-[#001f43] via-[#002B5C] to-[#004282] flex flex-col items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
               <motion.div 
                 animate={{ rotate: 360 }} 
                 transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
                 className="absolute -top-1/4 -right-1/4 w-[150%] h-[150%] opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0057A8] via-transparent to-transparent"
               ></motion.div>
               
               <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                 <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                   <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="0.5"/>
                 </pattern>
                 <rect width="100%" height="100%" fill="url(#grid)" />
               </svg>
            </div>

            <div className="z-10 text-center max-w-4xl px-6">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl mx-auto mb-8 flex items-center justify-center border border-white/20 shadow-2xl">
                  <Layers className="w-10 h-10 text-[#F5B400]" />
                </div>
                
                <h1 className={`${typography.h1} text-white mb-6 leading-tight drop-shadow-lg`}>
                  نمای کلی عملکرد و چشم‌انداز مدیریت محصول
                </h1>
                
                <p className="text-xl md:text-2xl text-blue-200 mb-12 font-light max-w-2xl mx-auto">
                  نمایی یکپارچه از پرتفوی محصولات، عملکرد و مسیر پیش‌رو
                </p>
                
                <button 
                  onClick={() => navigateTo('menu')}
                  className="group relative px-8 py-4 bg-[#F5B400] hover:bg-[#ffc824] text-[#002B5C] font-bold text-lg rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto overflow-hidden"
                >
                  <span className="relative z-10">شروع ارائه</span>
                  <ChevronLeft className="w-5 h-5 relative z-10 group-hover:-translate-x-1 transition-transform" />
                  <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300 ease-out z-0"></div>
                </button>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-10 left-0 right-0 text-center z-10"
            >
              <p className="text-blue-300/60 text-sm tracking-widest font-semibold">معاونت توسعه و نوآوری محصول</p>
            </motion.div>
          </motion.div>
        ) : (
          <div className="min-h-screen flex flex-col relative" key="app">
            <Header breadcrumbs={breadcrumbs} onNavigate={navigateTo} onHome={handleHome} />
            
            <main className="flex-1 relative pb-20">
              <AnimatePresence mode="wait">
                {renderView()}
              </AnimatePresence>
            </main>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
