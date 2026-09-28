import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Jivan Dhara Organisation database...");

  // 1. Create Default Admin
  const adminPassword = await bcrypt.hash("Admin@JDO2026#Secure", 10);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@jivandhara.org" },
    update: {},
    create: {
      name: "Pradip Kumar (Secretary / Super Admin)",
      email: "admin@jivandhara.org",
      passwordHash: adminPassword,
      role: "SUPER_ADMIN",
      phone: "9211420420",
    },
  });

  // 2. Create Demo Member Users
  const memberPassword = await bcrypt.hash("Member@123", 10);
  
  const member1User = await prisma.user.upsert({
    where: { email: "rahul.roy@example.com" },
    update: {},
    create: {
      name: "Rahul Roy",
      email: "rahul.roy@example.com",
      passwordHash: memberPassword,
      role: "MEMBER",
      phone: "9830012345",
    },
  });

  const member2User = await prisma.user.upsert({
    where: { email: "sunita.das@example.com" },
    update: {},
    create: {
      name: "Sunita Das",
      email: "sunita.das@example.com",
      passwordHash: memberPassword,
      role: "MEMBER",
      phone: "9831154321",
    },
  });

  // 3. Create Seed Members
  const member1 = await prisma.member.upsert({
    where: { membershipId: "JDO-2026-000001" },
    update: {},
    create: {
      userId: member1User.id,
      membershipId: "JDO-2026-000001",
      fullName: "Rahul Roy",
      parentName: "Late Subhash Roy",
      dob: "1994-05-12",
      gender: "Male",
      bloodGroup: "O+",
      mobile: "9830012345",
      whatsapp: "9830012345",
      email: "rahul.roy@example.com",
      idType: "Aadhaar",
      idNumber: "XXXXXXXX4589",
      address: "14/B, Bidhan Sarani",
      villageTown: "Shyambazar",
      postOffice: "Shyambazar",
      policeStation: "Shyampukur",
      district: "Kolkata",
      state: "West Bengal",
      pinCode: "700004",
      membershipType: "General Member",
      branch: "Kolkata Central",
      occupation: "Teacher",
      education: "Master of Science",
      volunteerInterests: "Education & PMGDISHA, Health Camps",
      emergencyContact: "9830099999 (Brother)",
      source: "Social Awareness Drive",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      status: "APPROVED",
      joiningDate: new Date("2026-01-15"),
      validityDate: new Date("2031-01-15"),
      payments: {
        create: {
          amount: 50,
          paymentMethod: "UPI",
          upiRef: "UPI5019283746",
          status: "VERIFIED",
          verifiedAt: new Date("2026-01-15"),
          verifiedBy: "Pradip Kumar",
        },
      },
    },
  });

  const member2 = await prisma.member.upsert({
    where: { membershipId: "JDO-2026-000002" },
    update: {},
    create: {
      userId: member2User.id,
      membershipId: "JDO-2026-000002",
      fullName: "Sunita Das",
      parentName: "Nirmal Das",
      dob: "1998-11-20",
      gender: "Female",
      bloodGroup: "B+",
      mobile: "9831154321",
      whatsapp: "9831154321",
      email: "sunita.das@example.com",
      idType: "Voter ID",
      idNumber: "WB/01/023/892019",
      address: "88/2, Raja Dinendra Street",
      villageTown: "Maniktala",
      postOffice: "Maniktala",
      policeStation: "Maniktala",
      district: "Kolkata",
      state: "West Bengal",
      pinCode: "700006",
      membershipType: "General Member",
      branch: "North Kolkata",
      occupation: "Social Worker",
      education: "Bachelor of Arts",
      volunteerInterests: "Women Empowerment & Child Welfare",
      emergencyContact: "9831100000 (Father)",
      source: "Community Meeting",
      photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      status: "APPROVED",
      joiningDate: new Date("2026-02-01"),
      validityDate: new Date("2031-02-01"),
      payments: {
        create: {
          amount: 50,
          paymentMethod: "UPI",
          upiRef: "UPI5099182374",
          status: "VERIFIED",
          verifiedAt: new Date("2026-02-01"),
          verifiedBy: "Pradip Kumar",
        },
      },
    },
  });

  // Pending applicant
  await prisma.member.create({
    data: {
      fullName: "Amitabh Banerjee",
      parentName: "S. K. Banerjee",
      dob: "1991-03-10",
      gender: "Male",
      bloodGroup: "A+",
      mobile: "9874561230",
      whatsapp: "9874561230",
      email: "amitabh.b@example.com",
      idType: "Aadhaar",
      idNumber: "XXXXXXXX7712",
      address: "22, G.T. Road",
      villageTown: "Belur",
      postOffice: "Belur Math",
      policeStation: "Bally",
      district: "Howrah",
      state: "West Bengal",
      pinCode: "711202",
      membershipType: "General Member",
      branch: "Howrah West",
      occupation: "Accountant",
      education: "B.Com",
      volunteerInterests: "Elderly Care & Blood Donation",
      emergencyContact: "9874500000",
      source: "Website",
      status: "PENDING",
      payments: {
        create: {
          amount: 50,
          paymentMethod: "UPI",
          upiRef: "UPI8829102938",
          status: "SUBMITTED",
        },
      },
    },
  });

  // 4. Create Genuine Site Settings
  const defaultSettings = [
    { key: "ngo_name", value: "Jivan Dhara Organisation" },
    { key: "ngo_short_name", value: "JDO (NGO)" },
    { key: "founded_year", value: "2008" },
    { key: "tagline", value: "Dedicated Sewa Trust Serving Humanity Across Urban & Rural Bengal" },
    { key: "address", value: "12, Raicharan Sadhukhan Road, Bridge, Near Gajnavi, Kolkata, West Bengal - 700037" },
    { key: "phone", value: "+91 9211420420" },
    { key: "whatsapp", value: "+919211420420" },
    { key: "email", value: "kumarpradip0303@gmail.com" },
    { key: "upi_id", value: "jivandhara@upi" },
    { key: "upi_number", value: "9211420420" },
    { key: "membership_fee", value: "50" },
    { key: "mission", value: "Our mission is the creation of such a society where nobody is deprived of the main current of development. We are determined for the establishment of that society in which everybody possesses 'Human rights' with dignity." },
    { key: "vision", value: "We aim to create a development revolution for the marginalized and socio-economically weaker sections of society through sustainable community action, education, healthcare, and empowerment." },
    { key: "governing_body", value: "A democratically elected Governing Committee of 9 persons elected every five years by the General Body, headed by the Secretary." },
    { key: "stat_members", value: "1250+" },
    { key: "stat_people_helped", value: "35000+" },
    { key: "stat_events", value: "240+" },
    { key: "stat_volunteers", value: "320+" },
    { key: "stat_years", value: "18" },
    { key: "facebook", value: "https://facebook.com/jivandharaorg" },
    { key: "instagram", value: "https://instagram.com/jivandharaorg" },
    { key: "youtube", value: "https://youtube.com/@jivandharaorg" },
  ];

  for (const s of defaultSettings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value },
    });
  }

  // 5. Seed Daily Status Updates
  const dailyStatuses = [
    {
      date: "2026-09-28",
      title: "Free RCH & General Health Checkup Camp at North Kolkata",
      description: "Our medical volunteer team organized a comprehensive Free Health Checkup, RCH (Reproductive and Child Health) camp and routine vaccination awareness in the local urban settlements. Over 140 women and children received consultation, essential medicines, and hygiene kits.",
      location: "Gajnavi & Raicharan Sadhukhan Ward, Kolkata",
      category: "Health & Medical",
      volunteersCount: 14,
      beneficiariesCount: 142,
      isPublished: true,
      photos: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80",
    },
    {
      date: "2026-09-25",
      title: "PMGDISHA Digital Saksharta Workshop & Certificate Distribution",
      description: "Successfully conducted the practical digital literacy assessment under the Pradhan Mantri Gramin Digital Saksharta Abhiyaan (PMGDISHA). 35 rural youth and women completed their modules on digital payments, e-governance portals, and online safety.",
      location: "JDO Community Learning Centre, West Bengal",
      category: "Education & PMGDISHA",
      volunteersCount: 8,
      beneficiariesCount: 35,
      isPublished: true,
      photos: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
    },
    {
      date: "2026-09-20",
      title: "School Bags & Study Material Distribution for Marginalized Students",
      description: "As part of our mission to prevent school dropouts, educational kits comprising school bags, notebooks, geometry boxes, and uniform sets were provided to disadvantaged students ahead of the academic term.",
      location: "BPL Community Hub, Shyampukur Area",
      category: "Child Welfare & Education",
      volunteersCount: 12,
      beneficiariesCount: 80,
      isPublished: true,
      photos: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80",
    },
  ];

  for (const ds of dailyStatuses) {
    await prisma.dailyStatus.create({ data: ds });
  }

  // 6. Seed Notices
  const notices = [
    {
      title: "Urgent: Blood Donation & Plasma Screening Camp Registration Open",
      description: "Jivan Dhara Organisation is organizing a mega blood donation drive in collaboration with regional government hospitals. All active members and volunteers are requested to participate or assist in community mobilization.",
      date: "2026-09-29",
      priority: "URGENT",
      isPublished: true,
    },
    {
      title: "Annual General Body & Governing Committee Quarterly Review Meeting",
      description: "The 3rd quarterly review meeting of the 9-member Governing Committee will be held on the second Sunday of next month. General members can submit suggestions for agenda items through their dashboard.",
      date: "2026-09-26",
      priority: "IMPORTANT",
      isPublished: true,
    },
    {
      title: "New Batch Enrollment for Free Tailoring & Handicraft Skill Center",
      description: "Registrations are now open for the 3-month certified vocational skill development course for women. Course includes hands-on stitching, embroidery, and basic business training.",
      date: "2026-09-22",
      priority: "NORMAL",
      isPublished: true,
    },
  ];

  for (const n of notices) {
    await prisma.notice.create({ data: n });
  }

  // 7. Seed Events
  const events = [
    {
      title: "Mega Free Medical Checkup & Eye Screening Camp",
      slug: "mega-free-medical-camp-2026",
      coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
      date: "2026-10-18",
      startTime: "09:00 AM",
      endTime: "04:00 PM",
      location: "12, Raicharan Sadhukhan Road Community Hall, Kolkata - 700037",
      mapUrl: "https://maps.google.com",
      description: "Comprehensive medical consultations by specialist doctors including General Physicians, Pediatricians, and Optometrists. Free basic blood sugar screening, blood pressure monitoring, and complimentary generic medicines for low-income families.",
      organizer: "Jivan Dhara Organisation Health Wing",
      status: "UPCOMING",
      maxAttendees: 200,
      isPublished: true,
    },
    {
      title: "Rural Farmer Support & Organic Agriculture Workshop",
      slug: "farmer-support-agriculture-workshop-2026",
      coverImage: "https://images.unsplash.com/photo-1592417817098-8f3d6eb2225a?w=800&auto=format&fit=crop&q=80",
      date: "2026-11-05",
      startTime: "10:30 AM",
      endTime: "03:30 PM",
      location: "JDO Extension Centre, Rural Hub",
      mapUrl: "https://maps.google.com",
      description: "Expert session on drought management, soil testing, cost-effective bio-fertilizers, and guidance on government subsidies and crop insurance schemes.",
      organizer: "Jivan Dhara Agriculture Department",
      status: "UPCOMING",
      maxAttendees: 150,
      isPublished: true,
    },
    {
      title: "Environment Protection: 1000 Native Sapling Plantation Drive",
      slug: "plantation-drive-2026",
      coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80",
      date: "2026-08-15",
      startTime: "08:00 AM",
      endTime: "01:00 PM",
      location: "Multiple Community Green Zones across Kolkata Suburbs",
      mapUrl: "https://maps.google.com",
      description: "Over 100 volunteers joined hands with school students to plant 1000 neem, banyan, and fruit-bearing saplings with tree guards.",
      organizer: "Jivan Dhara Eco Club",
      status: "COMPLETED",
      maxAttendees: 120,
      isPublished: true,
    },
  ];

  for (const ev of events) {
    await prisma.event.upsert({
      where: { slug: ev.slug },
      update: {},
      create: ev,
    });
  }

  // 8. Seed Gallery Items
  const gallery = [
    {
      title: "Child Education & Bag Distribution",
      category: "EDUCATION",
      url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80",
      caption: "Distributing school bags and study kits to enthusiastic young learners.",
      isFeatured: true,
      order: 1,
    },
    {
      title: "Community Free Health Screening Camp",
      category: "HEALTH_CAMPS",
      url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80",
      caption: "Doctors examining local residents during our Sunday healthcare camp.",
      isFeatured: true,
      order: 2,
    },
    {
      title: "Women Skill Development & Tailoring Class",
      category: "SOCIAL_WORK",
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
      caption: "Empowering women with self-reliant vocational skills.",
      isFeatured: true,
      order: 3,
    },
    {
      title: "Tree Plantation & Environmental Awareness",
      category: "COMMUNITY",
      url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80",
      caption: "Volunteers planting saplings for a greener future.",
      isFeatured: true,
      order: 4,
    },
    {
      title: "Elderly Care and Relief Distribution",
      category: "SOCIAL_WORK",
      url: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb7?w=800&auto=format&fit=crop&q=80",
      caption: "Supporting senior citizens with ration and winter blankets.",
      isFeatured: true,
      order: 5,
    },
    {
      title: "Volunteer Team Action Meeting",
      category: "VOLUNTEERS",
      url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=80",
      caption: "Our dedicated grassroots volunteers coordinating relief activities.",
      isFeatured: true,
      order: 6,
    },
  ];

  for (const g of gallery) {
    await prisma.galleryItem.create({ data: g });
  }

  // 9. Seed Approved Reviews
  const reviews = [
    {
      name: "Dr. Anirban Mukherjee",
      roleOrTitle: "Visiting Medical Officer",
      rating: 5,
      content: "I have volunteered with Jivan Dhara Organisation during several health camps. Their grassroots coordination and dedication to serving underprivileged families without any discrimination is truly exemplary.",
      isMember: true,
      status: "APPROVED",
    },
    {
      name: "Smt. Mousumi Chatterjee",
      roleOrTitle: "Skill Center Trainee & Beneficiary",
      rating: 5,
      content: "The free tailoring and digital literacy training gave me the confidence to earn an independent livelihood for my children. JDO is like family to our neighborhood.",
      isMember: true,
      status: "APPROVED",
    },
    {
      name: "Subrata Sen",
      roleOrTitle: "Monthly Donor & Community Supporter",
      rating: 5,
      content: "Complete transparency and genuine on-ground work. Every rupee contributed to Jivan Dhara is utilized directly for poor children's education and medical aid.",
      isMember: false,
      status: "APPROVED",
    },
  ];

  for (const r of reviews) {
    const existingReview = await prisma.review.findFirst({
      where: { name: r.name, content: r.content },
    });
    if (!existingReview) {
      await prisma.review.create({ data: r });
    }
  }

  // 10. Seed Demo Verified Donation
  const existingDonation = await prisma.donation.findUnique({
    where: { receiptNumber: "JDO-REC-2026-0001" },
  });
  if (!existingDonation) {
    await prisma.donation.create({
      data: {
        donorName: "Soumen Ganguly",
        email: "soumen.g@example.com",
        mobile: "9830129876",
        amount: 1000,
        purpose: "Child Education & Books Support",
        paymentMethod: "UPI",
        upiRef: "UPI9028371920",
        status: "VERIFIED",
        receiptNumber: "JDO-REC-2026-0001",
        verifiedAt: new Date("2026-09-15"),
      },
    });
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
