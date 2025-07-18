import React, { useState } from 'react';
import { ArrowLeft, Download, Receipt, Plus, Minus, DollarSign, CheckCircle, Calendar } from 'lucide-react';
import Link from 'next/link';

const InvoiceGenerator = () => {
  const [language, setLanguage] = useState('english');
  const [isPurchased, setIsPurchased] = useState(false);
  const [invoiceLanguage, setInvoiceLanguage] = useState('english');
  
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: 'INV-001',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    companyName: '',
    companyAddress: '',
    companyEmail: '',
    companyPhone: '',
    clientName: '',
    clientAddress: '',
    clientEmail: '',
    items: [
      { description: '', quantity: 1, rate: 0, amount: 0 }
    ],
    tax: 0,
    notes: ''
  });

  const handlePurchase = () => {
    alert('Redirecting to payment for Invoice Generator - $27 one-time unlimited access');
    setTimeout(() => {
      setIsPurchased(true);
    }, 2000);
  };

  const addItem = () => {
    if (!isPurchased) {
      alert('Please purchase unlimited access to add items');
      return;
    }
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
    });
  };

  const removeItem = (index: number) => {
    if (!isPurchased) return;
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const updateItem = (index: number, field: string, value: any) => {
    if (!isPurchased) return;
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }
    
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const taxAmount = (subtotal * invoiceData.tax) / 100;
    return subtotal + taxAmount;
  };

  const downloadInvoice = () => {
    if (!isPurchased) {
      alert('Please purchase unlimited access to download invoices');
      return;
    }
    alert(language === 'english' 
      ? 'Generating and downloading PDF invoice...' 
      : 'Waxaa la sameynayaa PDF bilka lacag-bixinta...'
    );
  };

  const getInvoiceText = () => {
    if (invoiceLanguage === 'somali') {
      return {
        invoice: 'Bil Lacag-bixin',
        invoiceNumber: 'Lambarka Bilka',
        date: 'Taariikhda',
        dueDate: 'Taariikhda Dhammadka',
        billTo: 'Bil u Dir',
        description: 'Sharaxaadda',
        quantity: 'Tirada',
        rate: 'Qiimaha',
        amount: 'Wadarta',
        subtotal: 'Isku-darka',
        tax: 'Cashuur',
        total: 'Isku-darka Guud',
        notes: 'Xusuusyo',
        paymentTerms: 'Shuruudaha Lacag-bixinta'
      };
    }
    return {
      invoice: 'Invoice',
      invoiceNumber: 'Invoice Number',
      date: 'Date',
      dueDate: 'Due Date',
      billTo: 'Bill To',
      description: 'Description',
      quantity: 'Qty',
      rate: 'Rate',
      amount: 'Amount',
      subtotal: 'Subtotal',
      tax: 'Tax',
      total: 'Total',
      notes: 'Notes',
      paymentTerms: 'Payment Terms'
    };
  };

  const text = getInvoiceText();

  if (!isPurchased) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Navigation */}
        <nav className="bg-black/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/ai-tools" className="flex items-center text-gray-300 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === 'english' ? 'Back to AI Tools' : 'Ku noqo Qaladaha AI'}
              </Link>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="english">🇺🇸 English</option>
                <option value="somali">🇸🇴 Somali</option>
              </select>
            </div>
          </div>
        </nav>

        {/* Purchase Page */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Receipt className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              {language === 'english' ? 'Invoice Generator' : 'Sameye Bilka Lacag-bixinta'}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {language === 'english' 
                ? 'Create unlimited professional invoices with English and Somali language support'
                : 'Samee bilal lacag-bixin xirfad leh oo aan xaddidnayn leh taageero luuqadaha Ingiriiska iyo Soomaalida'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Preview Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                {language === 'english' ? 'Invoice Preview' : 'Muuqaal Bilka'}
              </h3>
              <div className="bg-white rounded-lg p-6 text-black">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <h2 className="text-2xl font-bold text-purple-600">INVOICE</h2>
                  <p className="text-gray-600">INV-001</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="font-semibold">Your Company</h3>
                    <p className="text-sm text-gray-600">123 Business St<br/>City, State 12345</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Bill To:</h3>
                    <p className="text-sm text-gray-600">Client Name<br/>456 Client Ave<br/>City, State 67890</p>
                  </div>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Description</th>
                      <th className="text-right py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2">Service Item</td>
                      <td className="text-right py-2">$100.00</td>
                    </tr>
                  </tbody>
                </table>
                <div className="border-t pt-4 mt-4">
                  <div className="text-right">
                    <p><strong>Total: $100.00</strong></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Section */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-white mb-2">$27</div>
                <div className="text-purple-400 font-semibold mb-2">
                  {language === 'english' ? 'One-Time Payment' : 'Hal Mar Lacag Bixin'}
                </div>
                <div className="text-gray-400">
                  {language === 'english' ? 'Unlimited Access Forever' : 'Isticmaal Aan Xaddidnayn Weligaa'}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  language === 'english' ? 'Unlimited invoice creation' : 'Sameyn bilal aan xaddidnayn',
                  language === 'english' ? 'English & Somali language options' : 'Doorashada luuqadaha Ingiriiska iyo Soomaalida',
                  language === 'english' ? 'Professional templates' : 'Qaalibyada xirfadda leh',
                  language === 'english' ? 'Tax calculations' : 'Xisaabinta cashuurta',
                  language === 'english' ? 'PDF export' : 'Dheeheyn PDF',
                  language === 'english' ? 'Client management' : 'Maareynta macaamiisha'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-purple-400 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handlePurchase}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <DollarSign className="w-5 h-5 mr-2" />
                {language === 'english' ? 'Get Unlimited Access - $27' : 'Hel Isticmaal Xaddidlaan - $27'}
              </button>

              <p className="text-gray-400 text-sm text-center mt-4">
                {language === 'english' 
                  ? 'Secure payment processing • 30-day money-back guarantee'
                  : 'Nidaam lacag bixin ammaan • 30 maalmood lacag-celis dhamaad'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/ai-tools" className="flex items-center text-gray-300 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'english' ? 'Back to AI Tools' : 'Ku noqo Qaladaha AI'}
            </Link>
            <div className="flex items-center space-x-4">
              <div className="px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                {language === 'english' ? 'UNLIMITED ACCESS' : 'ISTICMAAL XADDIDLAAN'}
              </div>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="english">🇺🇸 English</option>
                <option value="somali">🇸🇴 Somali</option>
              </select>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Invoice Form */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Receipt className="w-6 h-6 mr-3" />
                {language === 'english' ? 'Invoice Details' : 'Faahfaahinta Bilka'}
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {text.invoiceNumber}
                  </label>
                  <input
                    type="text"
                    value={invoiceData.invoiceNumber}
                    onChange={(e) => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {language === 'english' ? 'Invoice Language' : 'Luuqada Bilka'}
                  </label>
                  <select
                    value={invoiceLanguage}
                    onChange={(e) => setInvoiceLanguage(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none"
                  >
                    <option value="english">🇺🇸 English</option>
                    <option value="somali">🇸🇴 Somali</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {text.date}
                  </label>
                  <input
                    type="date"
                    value={invoiceData.date}
                    onChange={(e) => setInvoiceData({...invoiceData, date: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {text.dueDate}
                  </label>
                  <input
                    type="date"
                    value={invoiceData.dueDate}
                    onChange={(e) => setInvoiceData({...invoiceData, dueDate: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Company Info */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {language === 'english' ? 'Your Company' : 'Shirkadaada'}
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder={language === 'english' ? 'Company Name' : 'Magaca Shirkada'}
                      value={invoiceData.companyName}
                      onChange={(e) => setInvoiceData({...invoiceData, companyName: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none"
                    />
                    <textarea
                      placeholder={language === 'english' ? 'Company Address' : 'Ciwaanka Shirkada'}
                      value={invoiceData.companyAddress}
                      onChange={(e) => setInvoiceData({...invoiceData, companyAddress: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Client Info */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {text.billTo}
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder={language === 'english' ? 'Client Name' : 'Magaca Macmiilka'}
                      value={invoiceData.clientName}
                      onChange={(e) => setInvoiceData({...invoiceData, clientName: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none"
                    />
                    <textarea
                      placeholder={language === 'english' ? 'Client Address' : 'Ciwaanka Macmiilka'}
                      value={invoiceData.clientAddress}
                      onChange={(e) => setInvoiceData({...invoiceData, clientAddress: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    {language === 'english' ? 'Items' : 'Alaabta'}
                  </h3>
                  <button
                    onClick={addItem}
                    className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    {language === 'english' ? 'Add Item' : 'Ku Dar Alaab'}
                  </button>
                </div>

                <div className="space-y-3">
                  {invoiceData.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-5">
                        <input
                          type="text"
                          placeholder={text.description}
                          value={item.description}
                          onChange={(e) => updateItem(index, 'description', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          placeholder={text.quantity}
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          placeholder={text.rate}
                          value={item.rate}
                          onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                      <div className="col-span-2">
                        <div className="px-3 py-2 bg-gray-700/50 rounded-lg text-white text-sm text-center">
                          ${item.amount.toFixed(2)}
                        </div>
                      </div>
                      <div className="col-span-1 text-center">
                        {invoiceData.items.length > 1 && (
                          <button
                            onClick={() => removeItem(index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tax */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {text.tax} (%)
                  </label>
                  <input
                    type="number"
                    value={invoiceData.tax}
                    onChange={(e) => setInvoiceData({...invoiceData, tax: parseFloat(e.target.value) || 0})}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <div className="w-full px-3 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-300 font-semibold text-center">
                    {text.total}: ${calculateTotal().toFixed(2)}
                  </div>
                </div>
              </div>

              <button
                onClick={downloadInvoice}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                {language === 'english' ? 'Download PDF Invoice' : 'Soo Deg PDF Bilka'}
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-2xl p-8 text-black shadow-2xl">
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h1 className="text-3xl font-bold text-purple-600 mb-2">{text.invoice}</h1>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>{text.invoiceNumber}:</strong> {invoiceData.invoiceNumber}</p>
                  <p><strong>{text.date}:</strong> {invoiceData.date}</p>
                  {invoiceData.dueDate && <p><strong>{text.dueDate}:</strong> {invoiceData.dueDate}</p>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-purple-600 mb-2">
                  {language === 'english' ? 'From:' : 'Ka:'}
                </h3>
                <div className="text-sm">
                  <p className="font-semibold">{invoiceData.companyName || 'Your Company Name'}</p>
                  <p className="whitespace-pre-line">{invoiceData.companyAddress || 'Your Company Address'}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-purple-600 mb-2">{text.billTo}:</h3>
                <div className="text-sm">
                  <p className="font-semibold">{invoiceData.clientName || 'Client Name'}</p>
                  <p className="whitespace-pre-line">{invoiceData.clientAddress || 'Client Address'}</p>
                </div>
              </div>
            </div>

            <table className="w-full mb-8 text-sm">
              <thead>
                <tr className="border-b-2 border-purple-600 text-purple-600">
                  <th className="text-left py-3 font-semibold">{text.description}</th>
                  <th className="text-center py-3 font-semibold w-20">{text.quantity}</th>
                  <th className="text-right py-3 font-semibold w-24">{text.rate}</th>
                  <th className="text-right py-3 font-semibold w-24">{text.amount}</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-3">{item.description || `Item ${index + 1}`}</td>
                    <td className="text-center py-3">{item.quantity}</td>
                    <td className="text-right py-3">${item.rate.toFixed(2)}</td>
                    <td className="text-right py-3">${item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end mb-6">
              <div className="w-64">
                <div className="flex justify-between py-2">
                  <span>{text.subtotal}:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                {invoiceData.tax > 0 && (
                  <div className="flex justify-between py-2">
                    <span>{text.tax} ({invoiceData.tax}%):</span>
                    <span>${((calculateSubtotal() * invoiceData.tax) / 100).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-t-2 border-purple-600 font-bold text-lg text-purple-600">
                  <span>{text.total}:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {invoiceData.notes && (
              <div className="mt-6">
                <h3 className="font-semibold text-purple-600 mb-2">{text.notes}:</h3>
                <p className="text-sm">{invoiceData.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;