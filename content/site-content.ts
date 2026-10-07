/**
 * Website content control center
 *
 * Edit the text, contact details, prices, and image references below to update
 * the website. Keep image files in public/images/ and use paths beginning with
 * /images/.
 */
const sharedIdentity = {
  practiceName: "Depth & Meaning Psychotherapy",
  // Plain-text spelling used by the existing logo descriptions and labels.
  practiceNamePlainText: "Depth and Meaning Psychotherapy",
  clinicianName: "Dr. Yana Romanov",
  clinicianCredentials: "LMFT, PsyD",
  copyrightYear: "2026",
} as const;
const termsLabel = "Terms and Conditions";
const privacyLabel = "Privacy Policy";

export const siteContent = {
  siteIdentity: {
    ...sharedIdentity,
    copyrightText: `© ${sharedIdentity.practiceNamePlainText.replace(" Psychotherapy", "")} ${sharedIdentity.copyrightYear}`,
  },

  contactInformation: {
    phone: {
      display: "(747) 305-3949",
      href: "tel:+17473053949",
    },
    email: {
      display: "yanaromanov@depthandmeaning.com",
      href: "mailto:yanaromanov@depthandmeaning.com",
    },
    officeHours: ["Monday – Friday", "11:00 – 6:00"],
    address: ["15455 San Fernando Mission Blvd", "Suite 300", "Mission Hills, CA 91345"],
  },

  metadata: {
    siteTitle: sharedIdentity.practiceName,
    titleTemplate: `%s | ${sharedIdentity.practiceName}`,
    siteDescription: `Depth-oriented psychotherapy with ${sharedIdentity.clinicianName} in Los Angeles.`,
    pages: {
      about: { title: "About" },
      services: { title: "Services" },
      fees: { title: "Fees" },
      blog: { title: "Blog" },
      contact: { title: "Contact" },
      legal: { title: "Terms & Privacy" },
    },
  },

  navigation: {
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Fees", href: "/fees" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    desktopAriaLabel: "Main navigation",
    mobileAriaLabel: "Mobile navigation",
    mobileMenuLabel: "Menu",
  },

  sharedLabels: {
    scheduleConsultation: "Schedule a Consultation",
  },

  header: {
    homeAriaLabel: `${sharedIdentity.practiceNamePlainText} home`,
  },

  footer: {
    contactHeading: "Contact",
    hoursHeading: "Hours",
    locationHeading: "Location",
    termsLabel,
    privacyLabel,
    legalLinkSeparator: "·",
  },

  homePage: {
    introductionAriaLabel: "Introduction",
    headlineLines: ["Discover Your Depth", "Find Your Meaning"],
    openingQuotationMark: "“",
    quotation: "My hope is that therapy becomes more than a place to reduce suffering. It can become a place where people reconnect with themselves, discover new meaning in their lives, and move toward living with greater authenticity, freedom, and purpose.",
    servicesHeading: "Therapy Services",
    services: [
      {
        title: "Anxiety",
        description: "Anxiety can shape how we think, feel, and experience everyday life. Persistent worry, racing thoughts, tension, and uncertainty can leave us feeling overwhelmed and disconnected from the present. Therapy offers a space to understand the deeper roots of anxiety, recognize patterns that sustain it, and develop greater self-awareness, clarity, and confidence.",
        imageKey: "anxietyService",
      },
      {
        title: "Depression",
        description: "Depression can affect how we see ourselves, our relationships, and our connection to life. Sadness, emptiness, exhaustion, or hopelessness can make even familiar things feel difficult. Therapy offers a supportive space to understand what lies beneath these experiences, explore patterns that keep you stuck, and reconnect with yourself, others, and what gives your life meaning.",
        imageKey: "depressionService",
      },
      {
        title: "Family therapy",
        description: "Family relationships can be deeply meaningful, yet patterns of conflict, misunderstanding, and disconnection can be difficult to change. Therapy offers a supportive space to understand these dynamics, address unresolved concerns, and develop healthier ways of communicating and relating—creating greater understanding, connection, and balance within the family.",
        imageKey: "familyTherapyService",
      },
    ],
    exploreAllLabel: "Explore all",
    exploreAllArrow: "→",
  },

  aboutPage: {
    portraitCaption: `${sharedIdentity.clinicianName}, ${sharedIdentity.clinicianCredentials}`,
    biographyParagraphs: [
      "Dr. Romanov is a psychotherapist practicing in the Los Angeles area whose work is grounded in psychoanalytic and existential psychotherapy. She believes that lasting psychological change begins with a deep understanding of the unconscious forces, life experiences, and relationships that shape who we become. Her therapeutic approach emphasizes not only symptom relief but also uncovering your true Self, personal transformation, resilience, and the search for meaning.",
      "Dr. Romanov has extensive clinical experience treating individuals struggling with complex trauma, PTSD, depression, anxiety disorders, schizophrenia spectrum disorders, eating disorders, and difficulties related to identity, relationships, and life transitions. She works with adults and teenagers from diverse cultural backgrounds and is particularly attuned to the emotional impact of trauma, loss, migration, and major life changes.",
      "In addition to her clinical work, Dr. Romanov conducted doctoral research in immigration studies, exploring the profound psychological transformation that accompanies migration, cultural adaptation, identity reconstruction, and belonging. Having lived in several countries and speaking multiple languages, she brings both professional expertise and personal understanding to the unique challenges faced by immigrants, expatriates, multilingual individuals, and those navigating life between cultures.",
      "Dr. Romanov earned her doctoral degree from The Chicago School of Professional Psychology, graduating with Delta Kappa Alpha Lambda honors. She completed advanced psychoanalytic training at the Valley Community Counseling Clinic, where she trained under the supervision of Dr. Callae Walcott-Rounds, Dr. Shari Saperstein, and Dr. Diane Fletcher-Hoppe. Her training emphasized depth-oriented psychotherapy, object relations theory, attachment, trauma-informed treatment, and long-term psychodynamic work.",
      "Her clinical philosophy is rooted in the belief that emotional suffering is meaningful. Symptoms often represent attempts to cope with unresolved conflicts, trauma, or losses, and psychotherapy offers an opportunity to understand these deeper patterns rather than simply suppress them. Dr. Romanov strives to create a warm, thoughtful, and nonjudgmental therapeutic relationship in which clients feel genuinely understood and supported while developing greater self-awareness, emotional freedom, and a more authentic way of living.",
      "Whether working with trauma, relationship difficulties, depression, anxiety, or questions of identity and purpose, Dr. Romanov's goal is to help clients discover a deeper understanding of themselves, heal authentically, and build lives that feel more meaningful, connected, and fully their own.",
    ],
  },

  servicesPage: {
    individualTherapy: {
      heading: "Individual Therapy",
      paragraphs: [
        "I work with men and women who want to understand themselves more deeply and create meaningful, lasting change in their lives. People come to therapy for many different reasons: depression, anxiety, trauma, relationship difficulties, loneliness, loss, immigration and cultural adjustment, career or life transitions, or simply a persistent feeling that something is missing or no longer working. I believe symptoms often carry meaning. Rather than focusing only on making them disappear, we become curious about what lies beneath them: the experiences, relationships, unconscious patterns, and ways of protecting yourself that may have once been necessary but may now be limiting your life.",
        "My approach is collaborative, warm, and depth-oriented. Together, we explore not only what is happening, but also why it may be happening and what it means to you. Through psychoanalytic and existential perspectives, we can begin to recognize recurring patterns, understand how the past continues to live in the present, and create greater freedom to choose rather than simply repeat. Therapy becomes a place to know yourself more fully, to develop a stronger and more authentic sense of self, deepen your relationships, navigate change with greater awareness, and discover what gives your life meaning, connection, and purpose.",
      ],
    },
    couplesTherapy: {
      heading: "Couples Therapy",
      paragraphs: [
        "I especially enjoy working with couples and helping partners understand not only the conflicts that bring them to therapy, but the deeper emotional patterns beneath them. Couples often find themselves repeating the same arguments, feeling increasingly distant, misunderstood, or unable to reach one another despite still caring deeply about the relationship. In our work together, we look beyond who is right or wrong and become curious about what is happening between you, the unspoken needs, fears, expectations, attachment patterns, and past experiences that each partner brings into the relationship. What appears to be a conflict about communication, intimacy, parenting, money, or everyday responsibilities often carries a much deeper emotional meaning.",
        "My approach to couples therapy is warm, collaborative, and nonjudgmental. I strive to create a space where both partners can feel heard and understood, while also helping each person recognize their contribution to the patterns that have developed between them. Drawing from psychoanalytic, attachment, existential, and systemic perspectives, we explore how individual histories become intertwined within the relationship and how the couple can begin to relate to one another differently. The goal is not simply to stop arguing, but to develop greater emotional intimacy, authenticity, trust, and understanding, creating a relationship in which both people can remain connected while also growing more fully into themselves.",
      ],
    },
    teenAndFamilyTherapy: {
      heading: "Teen and Family Therapy",
      paragraphs: [
        "I hold a deep belief that children and teenagers are rarely “the problem.” Often, their emotions and behaviors can be understood as meaningful responses to what they are experiencing within their family, relationships, school, or broader environment. Young people can become remarkably sensitive mirrors of the emotional world around them, sometimes expressing through anxiety, anger, withdrawal, sadness, or behavior what may be difficult for the family as a whole to recognize or put into words. For this reason, I approach teenagers with curiosity rather than judgment. I do not begin by asking, “What is wrong with this child?” but rather, “What is this young person experiencing, and what might they be trying to communicate?” My goal is to create a safe relationship in which a teenager can gradually feel understood, develop a stronger sense of self, and find healthier ways to express emotions and navigate the challenges of growing up.",
        "At the same time, I approach parents with the same compassion and respect. Parenting is one of the most difficult, complex, and emotionally demanding roles a person can undertake, and I do not believe in pathologizing or blaming parents when a family is struggling. Families can become caught in painful patterns even when everyone involved is trying their best. When appropriate, I work with both the teenager and the family to understand these patterns, improve communication, clarify boundaries, and create opportunities for genuine reconnection. Rather than searching for someone to blame, we work together to understand what has happened between family members and, most importantly, how they can begin to find their way back to one another.",
      ],
    },
    therapyIntensive: {
      statusLabel: "Development in Progress",
      heading: "Depth & Meaning Therapy Intensive",
      paragraphs: [
        "A Five-Hour Immersive Psychotherapy Experience offers an extended therapeutic space for people who want the opportunity to explore important emotional concerns, recurring patterns, relationships, identity, life transitions, and questions of meaning without the limitations of the traditional 50-minute hour. The five-hour format, with short restorative breaks, allows us to stay with important material as it unfolds, follow associations more deeply, make connections between past and present, and allow time for reflection and integration. It can be particularly valuable for busy professionals, high achievers, creatives, first responders, and others whose demanding schedules make weekly psychotherapy difficult, as well as for existing clients who have reached a point in their therapy where an extended session may support deeper exploration. The Intensive is not intended to promise faster results or manufacture a “breakthrough”; rather, it provides something increasingly difficult to find in everyday life—several protected hours devoted entirely to understanding yourself more deeply.",
        "Because extended psychotherapy can bring forward powerful emotions, memories, grief, unresolved conflicts, or unexpected insights, an Intensive may also leave a person feeling emotionally tired, vulnerable, unsettled, or in need of additional support afterward. For this reason, new patients are required to complete at least two preliminary sessions before an Intensive so that we can establish rapport, understand your history and current circumstances, assess whether this format is appropriate, and prepare for the experience together. Short breaks are incorporated throughout the five hours, and time at the end is reserved for integration and grounding. An integration session is scheduled for the following week, and the therapeutic connection does not abruptly end when the five hours are over: you are welcome to contact me afterward, including by phone when clinically appropriate, if something significant arises from the Intensive that needs to be addressed. The goal is not simply to go further in one day, but to create a thoughtful, contained therapeutic experience with preparation, depth, integration, and continuity of care.",
      ],
    },
    filmConsultation: {
      heading: "Psychological Consultation for Film",
      paragraphs: [
        "Compelling characters are rarely simply “good,” “bad,” “healthy,” or “disturbed”; they are just like us: psychologically complex human beings shaped by their histories, relationships, desires, fears, conflicts, and unconscious motivations. I provide psychological consultation for screenwriters, filmmakers, directors, and other creative professionals seeking to bring greater psychological depth, authenticity, and emotional truth to their work.",
        "Consultation may include developing psychologically believable characters and backstories, exploring conscious and unconscious motivations and relationship dynamics, portraying trauma and mental health conditions with accuracy and sensitivity, and considering how a character’s inner world might realistically shape their choices, behavior, dialogue, and transformation throughout a story.",
      ],
    },
    moreServices: {
      expandLabel: "See More",
      collapseLabel: "See Less",
      items: [
        { name: "Addiction", description: "Support for understanding patterns of substance use and building healthier ways of coping and living." },
        { name: "Codependency", description: "Develop healthier boundaries, strengthen self-awareness, and build more balanced relationships." },
        { name: "Divorce", description: "Support through the emotional challenges of separation, transition, and creating a new sense of direction." },
        { name: "Geriatric & Seniors", description: "Compassionate support for life transitions, aging, loss, relationships, and finding meaning later in life." },
        { name: "Grief", description: "A supportive space to process loss, honor what has changed, and find a way forward." },
        { name: "Infidelity", description: "Explore betrayal, trust, communication, and the difficult decisions that follow infidelity." },
        { name: "Marital & Premarital", description: "Strengthen communication, deepen connection, and navigate challenges within committed relationships." },
        { name: "Parenting", description: "Support for navigating parenting challenges, family dynamics, boundaries, and the demands of raising children." },
        { name: "Personality Disorders", description: "Develop deeper self-understanding and explore patterns that affect emotions, identity, and relationships." },
        { name: "Stress", description: "Learn to understand sources of stress and develop healthier ways to respond to life’s demands." },
        { name: "Trauma & PTSD", description: "A safe, supportive space to process difficult experiences and work toward greater stability and healing." },
        { name: "Women’s Issues", description: "Support for navigating the unique emotional, relational, and life experiences that affect women’s well-being." },
      ],
    },
  },

  feesPage: {
    introductionParagraphs: [
      "Therapy is an investment in the most important relationship you will ever have — the relationship with yourself. It is not simply a place to reduce symptoms or solve problems, but a deeply personal and creative process of discovering who you are beneath expectations, old wounds, defenses, and the roles you have learned to play. Through greater awareness of your inner world, you can begin to recognize what truly belongs to you: your desires, values, strengths, conflicts, and capacity for meaning.",
      "Therapy creates the space to understand your past without remaining bound by it, to make more conscious choices in the present, and to become the author of your own life. Ultimately, the work is about becoming more fully yourself and having the freedom and courage to live authentically, true to who you are.",
    ],
    sessions: [
      { name: "Individual Therapy", price: "$250", duration: "50-minute session" },
      { name: "Couples and Family Therapy", price: "$300", duration: "60-minute session" },
    ],
    insurance: {
      heading: "Out-of-Network Benefits",
      paragraphs: [
        "We are an out-of-network practice and do not take insurance.",
        "However, we can provide a superbill for clients to submit to their insurance company for reimbursement.",
      ],
    },
    payment: {
      heading: "Payment",
      description: "Payment is due at the time of each session. We accept credit/debit card, cash, and Zelle.",
    },
  },

  blogPage: {
    heading: "Blog",
    byLabel: "By",
    unavailableMessage: "The blog is temporarily unavailable. Please check back soon.",
    originalArticleLabel: "View original article on Medium",
  },

  contactPage: {
    heading: "Request a Consultation",
    form: {
      fullNameLabel: "Full Name",
      phoneLabel: "Phone Number",
      emailLabel: "Email Address",
      messageLabel: "Tell me about yourself and best time to reach you",
      wordLimit: 500,
      wordLimitLabel: "500 word limit",
      wordsRemainingLabel: "words remaining",
      submitLabel: "Request Consultation",
      sendingLabel: "Sending…",
      successMessage: "Thank you. Your request has been sent.",
      validationError: "Please check your contact details and message, then try again.",
      sendError: "Unable to send your message. Please try again.",
    },
  },

  legalPage: {
    termsHeading: termsLabel,
    termsSections: [
      {
        heading: "Website Disclaimer & Clinical Relationship",
        paragraphs: [`The information provided on this website is intended for general educational and informational purposes only and should not be considered psychotherapy, psychological or medical advice, diagnosis, or treatment. Visiting this website, reading its content, or submitting an inquiry does not establish a therapist-client relationship with ${sharedIdentity.practiceName} or any clinician associated with the practice. A therapeutic relationship is established only after appropriate consultation, mutual agreement to begin treatment, completion of required documentation and informed consent. Information presented on this website should not be used as a substitute for individualized evaluation or treatment by an appropriately licensed healthcare professional.`],
      },
      {
        heading: "Use and Disclosure of Information",
        paragraphs: [`We respect the sensitive nature of mental-health information and limit the use and disclosure of personal information in accordance with applicable privacy laws and professional standards. Information may be disclosed when authorized by you or when disclosure is permitted or required by law, including circumstances involving legal obligations, valid court orders, or situations in which disclosure is necessary to address serious safety concerns. This website may contain links to third-party websites or services; their privacy and security practices are governed by their own policies and are outside our control. By using this website, you acknowledge these limitations and are encouraged to contact ${sharedIdentity.practiceName} directly with questions regarding privacy, confidentiality, or the handling of your personal information.`],
      },
    ],
    privacyHeading: privacyLabel,
    privacyParagraphs: [`Your privacy and confidentiality are deeply important to us. ${sharedIdentity.practiceName} is a HIPAA-compliant practice, and we take appropriate administrative, technical, and professional measures to safeguard protected health information and other personal information entrusted to us. Information you voluntarily provide through this website, such as your name, telephone number, email address, or information submitted when requesting an appointment, is used for legitimate practice-related purposes, including responding to inquiries and facilitating services. While we take reasonable measures to protect information transmitted electronically, no method of communication or data transmission over the Internet can be guaranteed to be completely secure.`],
  },

  images: {
    branding: {
      headerLogo: { src: "/images/header-logo-transparent.png", alt: sharedIdentity.practiceNamePlainText, placeholderLabel: "Header logo" },
      footerLogo: { src: "/images/footer-logo-small.webp", alt: sharedIdentity.practiceNamePlainText, placeholderLabel: "Footer logo" },
      favicon: { src: "/images/favicon-128.png", alt: `${sharedIdentity.practiceNamePlainText} icon`, placeholderLabel: "Favicon" },
      pageBackground: { src: "/images/page-background.webp", alt: "", placeholderLabel: "Page background" },
    },
    homePage: {
      hero: { src: "/images/home-hero.webp", alt: "Coastal landscape at sunset", placeholderLabel: "Home hero image" },
      anxietyService: { src: "/images/home-anxiety.webp", alt: "", placeholderLabel: "Anxiety image" },
      depressionService: { src: "/images/home-depression.webp", alt: "", placeholderLabel: "Depression image" },
      familyTherapyService: { src: "/images/home-family.webp", alt: "", placeholderLabel: "Family therapy image" },
    },
    aboutPage: {
      clinicianPortrait: { src: "/images/dr-yana-romanov.webp", alt: sharedIdentity.clinicianName, placeholderLabel: "Portrait: dr-yana-romanov.png" },
    },
    servicesPage: {
      individualTherapy: { src: "/images/service-individual.webp", alt: "Individual therapy session", placeholderLabel: "Individual therapy image" },
      couplesTherapy: { src: "/images/service-couples.webp", alt: "Couples therapy session", placeholderLabel: "Couples therapy image" },
      teenAndFamilyTherapy: { src: "/images/service-family.webp", alt: "Family therapy session", placeholderLabel: "Teen and family therapy image" },
      therapyIntensive: { src: "/images/service-intensive.webp", alt: "An extended psychotherapy session", placeholderLabel: "Therapy intensive image" },
      filmConsultation: { src: "/images/service-film.webp", alt: "Film character consultation", placeholderLabel: "Film consultation image" },
    },
    feesPage: {
      growth: { src: "/images/fees-growth.webp", alt: "A young plant being held in caring hands", placeholderLabel: "Fees growth image" },
    },
  },
} as const;

export type SiteImage = {
  src: string;
  alt: string;
  placeholderLabel: string;
};
