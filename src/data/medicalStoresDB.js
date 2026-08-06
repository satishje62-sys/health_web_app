// ===================================================================
// MOCK MEDICAL STORES DATABASE — MediNear Hackathon Demo
// 12 medical stores in Patna, Bihar with their medicine inventories
// ===================================================================

export const MEDICAL_STORES = [
  {
    id: 'store-1',
    name: 'Apollo Pharmacy',
    address: 'Exhibition Road, Near Gandhi Maidan, Patna',
    area: 'Gandhi Maidan',
    city: 'Patna, Bihar',
    phone: '+91 98001 11001',
    distance: '0.3 km',
    rating: 4.8,
    totalRatings: 312,
    isOpen: true,
    openTime: '8:00 AM – 10:00 PM',
    logo: '🏥',
    type: 'Chain Pharmacy',
    homeDelivery: true,
    medicines: [
      'med-1', 'med-2', 'med-3', 'med-4', 'med-5',
      'med-6', 'med-7', 'med-8', 'med-9', 'med-10',
      'med-11', 'med-12', 'med-13'
    ]
  },
  {
    id: 'store-2',
    name: 'MedPlus Health Store',
    address: 'Boring Road, Near Patliputra Colony, Patna',
    area: 'Boring Road',
    city: 'Patna, Bihar',
    phone: '+91 98001 22002',
    distance: '0.7 km',
    rating: 4.6,
    totalRatings: 189,
    isOpen: true,
    openTime: '7:30 AM – 9:30 PM',
    logo: '💊',
    type: 'Chain Pharmacy',
    homeDelivery: true,
    medicines: [
      'med-1', 'med-4', 'med-5', 'med-7', 'med-8',
      'med-9', 'med-10', 'med-13', 'med-14'
    ]
  },
  {
    id: 'store-3',
    name: 'Shri Ram Medical Store',
    address: 'Kankarbagh Main Road, Near Bus Stand, Patna',
    area: 'Kankarbagh',
    city: 'Patna, Bihar',
    phone: '+91 98001 33003',
    distance: '1.1 km',
    rating: 4.4,
    totalRatings: 97,
    isOpen: true,
    openTime: '8:00 AM – 9:00 PM',
    logo: '🏪',
    type: 'Local Medical Store',
    homeDelivery: false,
    medicines: [
      'med-1', 'med-2', 'med-4', 'med-5', 'med-6',
      'med-9', 'med-10', 'med-11', 'med-13'
    ]
  },
  {
    id: 'store-4',
    name: 'Wellness Forever Pharmacy',
    address: 'Rajendra Nagar, Near IGIMS Hospital, Patna',
    area: 'Rajendra Nagar',
    city: 'Patna, Bihar',
    phone: '+91 98001 44004',
    distance: '1.5 km',
    rating: 4.7,
    totalRatings: 234,
    isOpen: true,
    openTime: '24 Hours Open',
    logo: '🌿',
    type: 'Chain Pharmacy',
    homeDelivery: true,
    medicines: [
      'med-1', 'med-2', 'med-3', 'med-5', 'med-6',
      'med-7', 'med-8', 'med-9', 'med-10', 'med-11',
      'med-12', 'med-13', 'med-14'
    ]
  },
  {
    id: 'store-5',
    name: 'Jan Aushadhi Kendra',
    address: 'Dak Bungalow Road, Opposite GPO, Patna',
    area: 'Dak Bungalow',
    city: 'Patna, Bihar',
    phone: '+91 98001 55005',
    distance: '1.8 km',
    rating: 4.2,
    totalRatings: 143,
    isOpen: true,
    openTime: '9:00 AM – 6:00 PM',
    logo: '🏛️',
    type: 'Govt. Jan Aushadhi',
    homeDelivery: false,
    medicines: [
      'med-1', 'med-4', 'med-5', 'med-6', 'med-9',
      'med-10', 'med-11', 'med-12', 'med-13'
    ]
  },
  {
    id: 'store-6',
    name: 'Gupta Medical Agency',
    address: 'Ashok Rajpath, Near Patna University, Patna',
    area: 'Ashok Rajpath',
    city: 'Patna, Bihar',
    phone: '+91 98001 66006',
    distance: '2.0 km',
    rating: 4.3,
    totalRatings: 76,
    isOpen: false,
    openTime: '8:00 AM – 8:30 PM',
    logo: '🏪',
    type: 'Local Medical Store',
    homeDelivery: false,
    medicines: [
      'med-1', 'med-2', 'med-3', 'med-4', 'med-7',
      'med-8', 'med-9', 'med-10'
    ]
  },
  {
    id: 'store-7',
    name: 'LifeCare Medicals',
    address: 'Bailey Road, Near Patna Sahib, Patna',
    area: 'Bailey Road',
    city: 'Patna, Bihar',
    phone: '+91 98001 77007',
    distance: '2.3 km',
    rating: 4.5,
    totalRatings: 165,
    isOpen: true,
    openTime: '7:00 AM – 11:00 PM',
    logo: '💉',
    type: 'Local Medical Store',
    homeDelivery: true,
    medicines: [
      'med-1', 'med-3', 'med-5', 'med-6', 'med-7',
      'med-8', 'med-9', 'med-11', 'med-12', 'med-13', 'med-14'
    ]
  },
  {
    id: 'store-8',
    name: 'Sanjivani Drug House',
    address: 'Mithapur, Near Mithapur Bus Stand, Patna',
    area: 'Mithapur',
    city: 'Patna, Bihar',
    phone: '+91 98001 88008',
    distance: '2.7 km',
    rating: 4.1,
    totalRatings: 52,
    isOpen: true,
    openTime: '8:00 AM – 8:00 PM',
    logo: '🌱',
    type: 'Local Medical Store',
    homeDelivery: false,
    medicines: [
      'med-1', 'med-4', 'med-5', 'med-8', 'med-9',
      'med-10', 'med-13'
    ]
  },
  {
    id: 'store-9',
    name: 'Netaji Medical Hall',
    address: 'Fraser Road, Near Maurya Hotel, Patna',
    area: 'Fraser Road',
    city: 'Patna, Bihar',
    phone: '+91 98001 99009',
    distance: '3.0 km',
    rating: 4.6,
    totalRatings: 210,
    isOpen: true,
    openTime: '8:00 AM – 10:00 PM',
    logo: '🏥',
    type: 'Local Medical Store',
    homeDelivery: false,
    medicines: [
      'med-1', 'med-2', 'med-3', 'med-4', 'med-5',
      'med-6', 'med-8', 'med-9', 'med-10', 'med-12'
    ]
  },
  {
    id: 'store-10',
    name: 'Health & Wellness Store',
    address: 'Kumhrar, Near Kumhrar Park, Patna',
    area: 'Kumhrar',
    city: 'Patna, Bihar',
    phone: '+91 98001 10010',
    distance: '3.4 km',
    rating: 4.0,
    totalRatings: 88,
    isOpen: true,
    openTime: '9:00 AM – 9:00 PM',
    logo: '💊',
    type: 'Wellness Store',
    homeDelivery: true,
    medicines: [
      'med-1', 'med-4', 'med-5', 'med-7', 'med-9',
      'med-10', 'med-11', 'med-13'
    ]
  },
  {
    id: 'store-11',
    name: 'Patna Medical Suppliers',
    address: 'Hardinge Road, Near Gandhi Setu, Patna',
    area: 'Hardinge Road',
    city: 'Patna, Bihar',
    phone: '+91 98001 11011',
    distance: '3.9 km',
    rating: 4.3,
    totalRatings: 119,
    isOpen: false,
    openTime: '9:00 AM – 7:00 PM',
    logo: '🏪',
    type: 'Medical Supplier',
    homeDelivery: false,
    medicines: [
      'med-2', 'med-3', 'med-6', 'med-7', 'med-8',
      'med-11', 'med-12', 'med-14'
    ]
  },
  {
    id: 'store-12',
    name: 'Aarogya Pharmacy',
    address: 'New Dak Bungalow Road, Near Bihar Sharif Chowk, Patna',
    area: 'New Dak Bungalow',
    city: 'Patna, Bihar',
    phone: '+91 98001 12012',
    distance: '4.2 km',
    rating: 4.5,
    totalRatings: 178,
    isOpen: true,
    openTime: '8:00 AM – 10:30 PM',
    logo: '🌿',
    type: 'Local Medical Store',
    homeDelivery: true,
    medicines: [
      'med-1', 'med-2', 'med-3', 'med-5', 'med-6',
      'med-7', 'med-8', 'med-9', 'med-10', 'med-12', 'med-13'
    ]
  }
];

// ===================================================================
// HELPER: Find which stores have the searched medicine
// ===================================================================
export function findStoresWithMedicine(medicineId) {
  return MEDICAL_STORES.filter(store =>
    store.medicines.includes(medicineId)
  ).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
}

// ===================================================================
// HELPER: Search medicines from SAMPLE_PHARMACY_DATABASE by query,
// then for each matching medicine, return stores that have it
// ===================================================================
export function searchMedicineAcrossStores(allMedicines, query) {
  if (!query || !query.trim()) return [];
  const q = query.toLowerCase().trim();

  const matchedMeds = allMedicines.filter(med =>
    med.name.toLowerCase().includes(q) ||
    med.brandName.toLowerCase().includes(q) ||
    med.genericName.toLowerCase().includes(q) ||
    med.category.toLowerCase().includes(q)
  );

  // For each matched medicine, find stores
  return matchedMeds.map(med => ({
    medicine: med,
    stores: findStoresWithMedicine(med.id)
  }));
}
