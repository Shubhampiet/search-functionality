import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdPersonOutline } from 'react-icons/md'
import { ImAttachment } from 'react-icons/im'
import { RiChat1Line } from 'react-icons/ri'
import { BsList } from 'react-icons/bs'
import { IoSettingsOutline } from 'react-icons/io5'
import { RiImageFill } from 'react-icons/ri'
import { GoVideo } from 'react-icons/go'
import { FaFolder } from 'react-icons/fa'
import { HiOutlineLink, HiOutlineExternalLink } from 'react-icons/hi'
import { HiCheck } from 'react-icons/hi'
import { mockData } from '../data/mockData'
import './SearchInterface.css'


const SearchInterface = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [hideSettingOptions, setHideSettingOptions] = useState(false)
  const [copiedItemId, setCopiedItemId] = useState(null)
  const [rotated, setRotated] = useState(false)
  const [searchResults, setSearchResults] = useState(mockData)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [visibleFilters, setVisibleFilters] = useState({
    files: true,
    people: true,
    chats: false,
    lists: false
  })

  useEffect(() => {
    let filtered = mockData

    // Apply search filter
    if (searchQuery && searchQuery.trim()) {
      filtered = filtered.filter((item) =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply visibility filter - only show items of types that are visible in header
    filtered = filtered.filter((item) => {
      if (!visibleFilters.files && item.type === 'file') return false
      if (!visibleFilters.people && item.type === 'person') return false
      if (!visibleFilters.chats && item.type === 'chat') return false
      if (!visibleFilters.lists && item.type === 'list') return false
      return true
    })

    // Apply type filter based on selected header tab
    if (selectedFilter !== 'all') {
      filtered = filtered.filter((item) => {
        if (selectedFilter === 'files') return item.type === 'file'
        if (selectedFilter === 'people') return item.type === 'person'
        if (selectedFilter === 'chats') return item.type === 'chat'
        if (selectedFilter === 'lists') return item.type === 'list'
        return true
      })
    }

    setSearchResults(filtered)
  }, [searchQuery, selectedFilter, visibleFilters])

  const selectFilter = (filterName) => {
    setSelectedFilter(filterName)
  }

  const toggleFilterVisibility = (filterName) => {
    setVisibleFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }))
    // Reset to "All" tab when visibility changes
    setSelectedFilter('all')
  }

  const getFilterCount = (type) => {
    let dataToCount = mockData

    // Apply search filter
    if (searchQuery && searchQuery.trim()) {
      dataToCount = dataToCount.filter((item) =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return dataToCount.filter((result) => {
      if (type === 'files') return result.type === 'file'
      if (type === 'people') return result.type === 'person'
      if (type === 'chats') return result.type === 'chat'
      if (type === 'lists') return result.type === 'list'
      return false
    }).length
  }

  const getTotalCount = () => {
    let dataToCount = mockData

    // Apply search filter if exists
    if (searchQuery && searchQuery.trim()) {
      dataToCount = dataToCount.filter((item) =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Only count items of types that are visible in header
    dataToCount = dataToCount.filter((item) => {
      if (!visibleFilters.files && item.type === 'file') return false
      if (!visibleFilters.people && item.type === 'person') return false
      if (!visibleFilters.chats && item.type === 'chat') return false
      if (!visibleFilters.lists && item.type === 'list') return false
      return true
    })

    return dataToCount.length
  }

  const renderAvatar = (result) => {
    if (result.type === 'person') {
      return (
        <div className="avatar-container">
          <div
            className="avatar"
          >
            <img
              src={result.avatar}
              alt="user-avatar"
              width="35px"
              height="35px"
              style={{ borderRadius: '20%' }}
            />
          </div>
          <div className="status-indicator">
            <span
              className={
                result.status === 'Active'
                  ? 'active'
                  : result.status === 'Last Active'
                  ? 'last-active'
                  : 'deactive'
              }
            ></span>
          </div>
        </div>
      )
    }

    if (result.type === 'file') {
      return (
        <div className="file-icon">
          {result.icon === 'image' && <RiImageFill size={20} />}
          {result.icon === 'video' && <GoVideo size={20} />}
          {result.icon === 'file' && <RiImageFill size={20} />}
          {result.icon === 'folder' && <FaFolder size={20} />}
        </div>
      )
    }
  }

  const handleSettingButtonClick = () => {
    setHideSettingOptions(!hideSettingOptions)
    setRotated(!rotated)
  }

  const handleCopyLink = (itemId, link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopiedItemId(itemId)
        setTimeout(() => {
          setCopiedItemId(null)
        }, 2000)
      })
      .catch((err) => {
        console.error('Failed to copy link:', err)
      })
  }

  const handleNewTab = (imageLink) => {
    window.open(imageLink, '_blank')
  }



  return (
    <div className="layout">

    <div className="search-interface">
      <div className="search-header">
        <div className="search-input-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              placeholder="Searching is easier"
            />
        </div>
         <div className="clear-button-container">
              {!searchQuery ? <div className="shortcut-indicator">
              <span className='text-inicator'>S</span>
              <span >quick access</span>
            </div> :
            <button
              className="clear-button"
              onClick={() => setSearchQuery('')}
              style={{color: !searchQuery ? "#A7A7A7" : "#000000"}}
            >
              Clear all
            </button>}
            </div>
      </div>

      <div className="search-content" style={{ display: searchQuery ? 'flex' : 'none' }}>
       
        <div className="main-content">

{/* Filter header */}
          <div className="search-filters">
            <div className="filter-tabs">
              <span
                className={`filter-tab ${selectedFilter === 'all' ? 'active' : ''}`}
                onClick={() => selectFilter('all')}
              >
                All <span className="count">{getTotalCount()}</span>
              </span>

              {visibleFilters.files && (
                <span
                  className={`filter-tab ${selectedFilter === 'files' ? 'active' : ''}`}
                  onClick={() => selectFilter('files')}
                >
                  <ImAttachment className="filter-icon" />
                  Files <span className="count">{getFilterCount('files')}</span>
                </span>
              )}

              {visibleFilters.people && (
                <span
                  className={`filter-tab ${selectedFilter === 'people' ? 'active' : ''}`}
                  onClick={() => selectFilter('people')}
                >
                  <MdPersonOutline className="filter-icon" />
                  People <span className="count">{getFilterCount('people')}</span>
                </span>
              )}

              {visibleFilters.chats && (
                <span
                  className={`filter-tab ${selectedFilter === 'chats' ? 'active' : ''}`}
                  onClick={() => selectFilter('chats')}
                >
                  <RiChat1Line className="filter-icon" />
                  Chats <span className="count">{getFilterCount('chats')}</span>
                </span>
              )}

              {visibleFilters.lists && (
                <span
                  className={`filter-tab ${selectedFilter === 'lists' ? 'active' : ''}`}
                  onClick={() => selectFilter('lists')}
                >
                  <BsList className="filter-icon" />
                  Lists <span className="count">{getFilterCount('lists')}</span>
                </span>
              )}
            </div>

            <button
              className="settings-button"
              onClick={handleSettingButtonClick}
               style={{
        border: "none",
        background: "transparent",
        cursor: "pointer",
      }}
            >
              <IoSettingsOutline size={20} style={{
          transition: "transform 0.3s ease",
          transform: rotated ? "rotate(45deg)" : "rotate(0deg)",
        }}/>
            </button>
          </div>

{/* Filter result */}
          <div className="search-results">
            {searchResults.map(result => (
              <div key={result.id} className="result-item">
                <div className="result-avatar">
                  {renderAvatar(result)}
                </div>

                <div className="result-content">
                  <div className="result-name">{result.name}</div>
                  <div className="result-meta">
                    {result.statusText || result.location}
                    {result.fileCount && ` ${result.fileCount}`}
                  </div>
                </div>

                {/* Action buttons for all items */}
                <div className="result-actions">
                  <button
                    className="action-btn copy-btn"
                    onClick={() => handleCopyLink(result.id, result.link)}
                    title="Copy link"
                  >
                    <HiOutlineLink size={16} />
                  </button>
                  <button
                    className="action-btn new-tab-btn"
                    onClick={() => handleNewTab(result.link)}
                    title="Open in new tab"
                  >
                    <HiOutlineExternalLink size={16} />
                  </button>
                </div>

                {/* Link copied notification */}
                {copiedItemId === result.id && (
                  <div className="copied-notification">
                    <HiCheck size={12} />
                    Link copied!
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          className="filter-panel"
          style={{ display: hideSettingOptions ? 'grid' : 'none' }}
        >
          <div className="filter-section">
            <div className={`filter-item ${visibleFilters.files ? 'active' : ''}`}>
              <ImAttachment className="filter-icon" />
              <span>Files</span>
              <div className={`toggle ${visibleFilters.files ? 'active' : ''}`}
                   onClick={() => toggleFilterVisibility('files')}>
                <div className="toggle-slider"></div>
              </div>
            </div>

            <div className={`filter-item ${visibleFilters.people ? 'active' : ''}`}>
              <MdPersonOutline className="filter-icon" />
              <span>People</span>
              <div className={`toggle ${visibleFilters.people ? 'active' : ''}`}
                   onClick={() => toggleFilterVisibility('people')}>
                <div className="toggle-slider"></div>
              </div>
            </div>

            <div className={`filter-item ${visibleFilters.chats ? 'active' : ''}`}>
              <RiChat1Line className="filter-icon" />
              <span>Chats</span>
              <div className={`toggle ${visibleFilters.chats ? 'active' : ''}`}
                   onClick={() => toggleFilterVisibility('chats')}>
                <div className="toggle-slider"></div>
              </div>
            </div>

            <div className={`filter-item ${visibleFilters.lists ? 'active' : ''}`}>
              <BsList className="filter-icon" />
              <span>Lists</span>
              <div className={`toggle ${visibleFilters.lists ? 'active' : ''}`}
                   onClick={() => toggleFilterVisibility('lists')}>
                <div className="toggle-slider"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    </div>
  )
}

export default SearchInterface