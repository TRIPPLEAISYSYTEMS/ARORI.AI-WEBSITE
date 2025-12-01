export interface FaqItem {
  question: string;
  answer: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  business: string;
  message: string;
}

export interface NavLink {
  label: string;
  href: string;
}