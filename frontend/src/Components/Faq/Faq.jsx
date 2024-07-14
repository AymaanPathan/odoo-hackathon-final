import FaqCard from "./FaqCard";
import "./Faq.css";

const items = [
  {
    title: "What is a library management system?",
    content:
      "A library management system is software that helps manage library operations such as cataloging, circulation, tracking borrowed and overdue items, and managing member records.",
  },
  {
    title: "What types of materials can I borrow from the library?",
    content:
      "You can borrow books, magazines and other materials as specified in the 'Library Collection' section."
  },
  {
    title: "What happens if I damage a book?",
    content:
      "If a book is damaged, please inform the library staff. You may be required to pay for the repair or replacement of the book, as outlined in the 'Policies' section.",
  },
  {
    title: "How do I search for a book?",
    content:
      "Use the search bar on the home page to enter the title, author, ISBN, or keywords related to the book you're looking for.",
  },
];

export default function Faq() {
  return (
    <div className="faq_main mt-24  p-8  bg-[#fff]">
      <div className="text-center grid gap-3">
        <span className="text-gray-500 font-bold text-lg">FAQ</span>
        <span className="text-2xl font-semibold">Have Queries? Refer Here</span>
      </div>
      <FaqCard items={items} />
    </div>
  );
}