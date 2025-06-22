import { useState } from 'react';
import AddItem from './AddItem';
import ViewItems from './ViewItems';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react'; // icon for hamburger
import './App.css';

const initialItems = [
  {
    id : 1,
    name: 'Classic White Shirt',
    email : 'xyz@gmail.com',
    type: 'Shirt',
    description: 'A crisp white shirt made from organic cotton. Ideal for formal and casual wear.',
    coverImage: '/images/shirt-white.jpg',
    additionalImages: [
      '/images/shirt-white-1.jpg',
      '/images/shirt-white-2.jpg',
    ],
  },
  {
    id:2,
    name: 'Slim Fit Jeans',
    email : 'xyz@gmail.com',
    type: 'Pant',
    description: 'Comfortable slim fit denim jeans suitable for all-day wear.',
    coverImage: '/images/jeans-slimfit.jpg',
    additionalImages: [
      '/images/jeans-slimfit-1.jpg',
      '/images/jeans-slimfit-2.jpg',
    ],
  },
  {
    id:3,
    name: 'Running Shoes X200',
    email : 'xyz@gmail.com',
    type: 'Shoes',
    description: 'Lightweight running shoes with breathable mesh and anti-slip soles.',
    coverImage: '/images/shoes-x200.jpg',
    additionalImages: [
      '/images/shoes-x200-1.jpg',
      '/images/shoes-x200-2.jpg',
    ],
  },
  {
    id:4,
    name: 'Pro Sports Gear Kit',
    email : 'xyz@gmail.com',
    type: 'Sports Gear',
    description: 'Complete set of sports gear including gloves, pads, and helmet for training and competition.',
    coverImage: '/images/sports-gear.jpg',
    additionalImages: [
      '/images/sports-gear-1.jpg',
      '/images/sports-gear-2.jpg',
      '/images/sports-gear-3.jpg',
    ],
  },
];

function App() {
  const [items, setItems] = useState(initialItems);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="flex w-full h-screen flex-col md:flex-row">

        {/* Mobile Nav Header */}
        <div className="flex md:hidden justify-between items-center bg-gray-800 text-white px-4 py-3">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`
            ${isMobileMenuOpen ? 'block' : 'hidden'} 
            md:block 
            w-full md:w-60 bg-gray-800 text-white p-6 space-y-4 
            md:space-y-4
          `}
        >
          <h2 className="text-2xl font-bold mb-6 hidden md:block">Dashboard</h2>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `block px-4 py-2 rounded transition ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Add Item
          </NavLink>
          <NavLink
            to="/view"
            className={({ isActive }) =>
              `block px-4 py-2 rounded transition ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            View Items
          </NavLink>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-100">
          <Routes>
            <Route path="/" element={<AddItem setItems={setItems} />} />
            <Route path="/view" element={<ViewItems initialItems={items} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
