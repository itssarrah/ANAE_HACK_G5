import React from "react";
import { Menu, X, Inbox, CheckCircle, XCircle, Bot } from "lucide-react";

const Sidebar = ({
  isOpen,
  toggleSidebar,
  activeSection,
  setActiveSection,
}) => {
  const NavItem = ({ icon: Icon, text, section }) => (
    <button
      onClick={() => setActiveSection(section)}
      className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors
        ${
          activeSection === section
            ? "bg-blue-100 text-blue-700"
            : "hover:bg-gray-100 text-gray-700"
        }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{text}</span>
    </button>
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="sticky inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`sticky top-0 left-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-30 flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <span className="font-semibold">Dashboard</span>
          <button onClick={toggleSidebar} className="p-1 lg:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 flex flex-col items-center border-b border-gray-200">
          <img
            src="/admin.jpg"
            alt="Admin"
            className="w-16 h-16 rounded-full shadow-md"
          />
          <span className="mt-3 font-medium">Admin</span>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          <NavItem icon={Inbox} text="Suggestions" section="suggestions" />
          <NavItem icon={CheckCircle} text="Approvals" section="approvals" />
          <NavItem icon={XCircle} text="Rejections" section="rejections" />
        </nav>

        {/* Logo container at the bottom */}
        <div className="p-4 border-t border-gray-200 flex justify-center items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-48 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
