# Search Interface

A modern, responsive search interface built with React.js featuring dynamic filtering, search functionality, and a clean user experience.

## ✨ Features

- **🔍 Real-time Search**: Instant search results as you type
- **🏷️ Dynamic Filtering**: Filter by Files, People, Chats, and Lists
- **👁️ Visibility Controls**: Toggle filter visibility in header via settings panel
- **📱 Responsive Design**: Works seamlessly across all device sizes
- **📋 Copy Links**: Copy item links to clipboard with visual feedback
- **🔗 External Links**: Open items in new tabs
- **🎨 Modern UI**: Clean, modern interface with smooth animations
- **⚡ Performance**: Optimized rendering and state management

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd search-page
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/
│   ├── SearchInterface.jsx    # Main search component
│   └── SearchInterface.css    # Component styles
├── data/
│   └── mockData.js           # Mock data for search results
└── App.jsx                   # Root component
```

## 🎯 How to Use

### Basic Search
1. Type in the search input to filter results
2. Clear search using the "Clear all" button
3. Use keyboard shortcut "S" for quick access

### Filtering
1. **Header Tabs**: Click on filter tabs (All, Files, People, etc.) to view specific content types
2. **Settings Panel**: Click the settings gear icon to access visibility controls
3. **Toggle Visibility**: Use toggle switches to show/hide filter tabs in the header

### Interactions
- **Copy Link**: Click the link icon to copy item URL to clipboard
- **Open in New Tab**: Click the external link icon to open item in new window
- **Status Indicators**: View user activity status (Active, Inactive, Last Active)

## 🎨 Customization

### Adding New Data
Update `/src/data/mockData.js` to add new search items:

```javascript
{
  id: 7,
  type: 'file', // 'person' | 'file' | 'chat' | 'list'
  name: 'Your Item Name',
  location: 'File location info', // for files
  statusText: 'Status info', // for people
  icon: 'folder', // 'image' | 'video' | 'file' | 'folder'
  status: 'Active', // for people
  avatar: 'avatar-url', // for people
  link: 'item-url'
}
```

### Styling
- Modify `/src/components/SearchInterface.css` for custom styles
- CSS uses a mix of static and dynamic units for optimal responsiveness
- Font family and colors can be customized in the CSS file

### Adding New Filter Types
1. Update `visibleFilters` state in `SearchInterface.jsx`
2. Add new filter tab in the header section
3. Add new toggle in the settings panel
4. Update filtering logic in `useEffect`

## 🔧 Technical Details

### State Management
- **Search Query**: Real-time search input handling
- **Selected Filter**: Active filter tab state
- **Visible Filters**: Controls which tabs appear in header
- **Search Results**: Filtered data based on search and filters

### Performance Optimizations
- Efficient filtering with multiple criteria
- Optimized re-renders with proper dependency arrays
- Smooth animations with CSS transitions

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Known Issues

- None currently reported

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Icons provided by [React Icons](https://react-icons.github.io/react-icons/)
- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)
- UI inspiration from modern search interfaces

---

**Made with ❤️ using React.js**