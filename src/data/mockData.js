/**
 * CampusFind – Initial Seed Data
 * Pre-populated with realistic campus items across categories and locations.
 */

export const CATEGORIES = [
  'All',
  'Electronics',
  'Books and Notes',
  'Bags',
  'Clothing',
  'ID Cards',
  'Accessories',
  'Water Bottles',
  'Keys',
  'Other'
];

export const CAMPUS_LOCATIONS = [
  'Central Library – 2nd Floor Reading Room',
  'Central Library – Group Discussion Pods',
  'Engineering Block – Lab 304',
  'Science Block – Chemistry Lecture Hall A',
  'Student Cafeteria & Food Court',
  'Sports Complex & Gymnasium',
  'Main Campus Auditorium',
  'Administration Block – Reception',
  'Student Activity Center',
  'Campus Grounds – North Courtyard'
];

export const INITIAL_FOUND_ITEMS = [
  {
    id: 'FND-2026-101',
    title: 'Apple AirPods Pro (2nd Gen) in Case',
    category: 'Electronics',
    description: 'Found on desk #14 in the 2nd Floor Reading Room. White charging case with slight scuff on back hinge. Case has charge.',
    dateFound: '2026-11-04',
    locationFound: 'Central Library – 2nd Floor Reading Room',
    status: 'Available', // 'Available' | 'Claim Pending' | 'Claim Approved' | 'Returned'
    registeredBy: 'Officer Rajesh Kumar (Campus Security)',
    staffId: 'SEC-8821',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&q=80',
    additionalNotes: 'Serial number verified and noted in secure office registry.'
  },
  {
    id: 'FND-2026-102',
    title: 'North Face Surge Backpack (Charcoal Grey)',
    category: 'Bags',
    description: 'Left behind under a table in the cafeteria near the smoothie counter. Contains spiral notebooks and stationery pouch.',
    dateFound: '2026-11-05',
    locationFound: 'Student Cafeteria & Food Court',
    status: 'Available',
    registeredBy: 'Meera Thomas (Student Helpdesk)',
    staffId: 'STF-4102',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    additionalNotes: 'Contains 2 engineering notebooks; no wallet or ID card inside.'
  },
  {
    id: 'FND-2026-103',
    title: 'College Student ID Card (CS Department)',
    category: 'ID Cards',
    description: 'Found near the water cooler outside Lecture Hall A. Student ID Card belonging to second-year student Elena Davis.',
    dateFound: '2026-11-05',
    locationFound: 'Science Block – Chemistry Lecture Hall A',
    status: 'Claim Pending',
    registeredBy: 'Prof. David Vance (Dept Coordinator)',
    staffId: 'FAC-1090',
    image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600&q=80',
    additionalNotes: 'Held securely at Department Office Room 204.'
  },
  {
    id: 'FND-2026-104',
    title: 'Hydro Flask 32oz Insulated Water Bottle',
    category: 'Water Bottles',
    description: 'Olive green wide-mouth bottle with black straw lid. Has a small national park sticker on the bottom half.',
    dateFound: '2026-11-03',
    locationFound: 'Sports Complex & Gymnasium',
    status: 'Available',
    registeredBy: 'Coach Marcus Bell (Athletics)',
    staffId: 'ATH-3301',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80',
    additionalNotes: 'Kept in Gymnasium equipment desk lost box.'
  },
  {
    id: 'FND-2026-105',
    title: 'Set of 3 Keys with Burgundy Leather Tag',
    category: 'Keys',
    description: 'Two brass door keys and one small mailbox key on a silver ring with an embossed leather college keychain.',
    dateFound: '2026-11-02',
    locationFound: 'Campus Grounds – North Courtyard',
    status: 'Available',
    registeredBy: 'Officer Rajesh Kumar (Campus Security)',
    staffId: 'SEC-8821',
    image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&q=80',
    additionalNotes: 'Stored in Security Control Room Key Locker #4.'
  },
  {
    id: 'FND-2026-106',
    title: 'Casio fx-991EX ClassWiz Scientific Calculator',
    category: 'Electronics',
    description: 'Found on bench in Engineering Block. Protective slide-on hard cover has small initial markings inside.',
    dateFound: '2026-11-01',
    locationFound: 'Engineering Block – Lab 304',
    status: 'Returned',
    registeredBy: 'Lab Technician Anil Sen',
    staffId: 'LAB-2033',
    image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&q=80',
    additionalNotes: 'Handed over to rightful owner on Nov 3 after verification.'
  }
];

export const INITIAL_LOST_REPORTS = [
  {
    id: 'LST-2026-801',
    itemName: 'Black HP Pavilion 15" Laptop',
    category: 'Electronics',
    description: 'Black laptop with matte finish. Has an octocat GitHub sticker on the top left lid. Left near study booth #3.',
    dateLost: '2026-11-04',
    locationLost: 'Central Library – 2nd Floor Reading Room',
    distinguishingFeatures: 'Custom sticker on lid; small dent on left USB port.',
    reporterName: 'Kevin Matthews',
    reporterEmail: 'kevin.m@college.edu',
    reporterPhone: '+1 (555) 234-8991',
    status: 'Submitted', // 'Submitted' | 'Potential Match Found' | 'Under Review' | 'Claim Pending' | 'Approved' | 'Returned'
    dateReported: '2026-11-04',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=80'
  },
  {
    id: 'LST-2026-802',
    itemName: 'Apple AirPods Pro in White Case',
    category: 'Electronics',
    description: 'Lost my wireless earbuds somewhere while studying in the library before afternoon classes.',
    dateLost: '2026-11-04',
    locationLost: 'Central Library – 2nd Floor Reading Room',
    distinguishingFeatures: 'Small red heart engraved or written faintly with pen inside lid; left earbud has small scratch.',
    reporterName: 'Alex Mercer (Student)',
    reporterEmail: 'alex.student@college.edu',
    reporterPhone: '+1 (555) 891-2300',
    status: 'Potential Match Found',
    matchedItemId: 'FND-2026-101',
    dateReported: '2026-11-04',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&q=80'
  },
  {
    id: 'LST-2026-803',
    itemName: 'Student Identity Card (Elena Davis)',
    category: 'ID Cards',
    description: 'My official college ID card fell out of my pocket between the Chemistry lecture and the lab.',
    dateLost: '2026-11-05',
    locationLost: 'Science Block – Chemistry Lecture Hall A',
    distinguishingFeatures: 'CS Department, class of 2026, lanyard clip attached.',
    reporterName: 'Elena Davis',
    reporterEmail: 'elena.davis@college.edu',
    reporterPhone: '+1 (555) 431-7720',
    status: 'Claim Pending',
    matchedItemId: 'FND-2026-103',
    dateReported: '2026-11-05',
    image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600&q=80'
  }
];

export const INITIAL_CLAIMS = [
  {
    id: 'CLM-2026-401',
    itemId: 'FND-2026-103',
    itemTitle: 'College Student ID Card (CS Department)',
    claimantName: 'Elena Davis',
    claimantEmail: 'elena.davis@college.edu',
    claimantPhone: '+1 (555) 431-7720',
    claimDate: '2026-11-05',
    status: 'Pending Verification', // 'Pending Verification' | 'Approved' | 'Rejected' | 'Returned'
    distinguishingCharacteristics: 'ID #202488, has minor wear on barcode, photo taken in August 2024.',
    verificationAnswer: 'I have my course registration receipt on my phone showing this matching student roll number.',
    referencePhoto: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600&q=80',
    adminNote: '',
    pickupInstructions: 'Report to Central Administration Block, Room 102 (Campus Lost & Found Services) Mon-Fri 9:00 AM - 4:30 PM with government photo ID.'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'NOTIF-1',
    userId: 'alex.student@college.edu',
    title: 'Potential Match Found! 🔍',
    message: 'An item matching your "Apple AirPods Pro" was registered by Campus Security at Central Library.',
    date: '2026-11-04 15:30',
    read: false,
    type: 'match',
    linkItemId: 'FND-2026-101'
  },
  {
    id: 'NOTIF-2',
    userId: 'elena.davis@college.edu',
    title: 'Claim Submitted Successfully',
    message: 'Your claim for College Student ID Card is currently undergoing security review.',
    date: '2026-11-05 11:20',
    read: false,
    type: 'claim_submitted'
  },
  {
    id: 'NOTIF-3',
    userId: 'alex.student@college.edu',
    title: 'Report Registered',
    message: 'Your lost item report LST-2026-802 is now active in the campus recovery system.',
    date: '2026-11-04 14:10',
    read: true,
    type: 'system'
  }
];

