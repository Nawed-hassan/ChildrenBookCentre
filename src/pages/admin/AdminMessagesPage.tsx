import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { contactMessages } from '../../data/contact-messages';
import { Search, Mail, MailOpen, Trash2 } from 'lucide-react';

const AdminMessagesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  
  let filteredMessages = [...contactMessages];
  
  // Sort by date (newest first)
  filteredMessages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Filter by unread if selected
  if (showUnreadOnly) {
    filteredMessages = filteredMessages.filter(message => !message.read);
  }
  
  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredMessages = filteredMessages.filter(
      message => 
        message.name.toLowerCase().includes(query) || 
        message.email.toLowerCase().includes(query) ||
        message.subject.toLowerCase().includes(query) ||
        message.message.toLowerCase().includes(query)
    );
  }
  
  // Get selected message
  const selectedMessage = selectedMessageId 
    ? contactMessages.find(m => m.id === selectedMessageId) 
    : null;
  
  // Mark as read functionality
  const markAsRead = (id: string) => {
    const messageIndex = contactMessages.findIndex(m => m.id === id);
    if (messageIndex !== -1) {
      contactMessages[messageIndex].read = true;
    }
  };
  
  // Handle message selection
  const handleMessageSelect = (id: string) => {
    setSelectedMessageId(id);
    markAsRead(id);
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Manage Messages</h1>
      
      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          
          <div className="flex items-center">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={showUnreadOnly}
                onChange={() => setShowUnreadOnly(!showUnreadOnly)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700">Show unread only</span>
            </label>
          </div>
        </div>
      </div>
      
      {/* Messages UI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="md:col-span-1 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-medium text-gray-700">Messages ({filteredMessages.length})</h2>
          </div>
          
          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <button
                  key={message.id}
                  className={`w-full text-left p-4 hover:bg-gray-50 ${
                    selectedMessageId === message.id ? 'bg-primary-50' : ''
                  } ${!message.read ? 'font-semibold' : ''}`}
                  onClick={() => handleMessageSelect(message.id)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-900">{message.name}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(message.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mb-1 truncate">{message.email}</div>
                  <div className="flex items-center">
                    {!message.read ? (
                      <Mail className="h-4 w-4 text-primary-600 mr-2" />
                    ) : (
                      <MailOpen className="h-4 w-4 text-gray-400 mr-2" />
                    )}
                    <span className={`truncate ${!message.read ? 'text-gray-900' : 'text-gray-600'}`}>
                      {message.subject}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No messages found
              </div>
            )}
          </div>
        </div>
        
        {/* Message Detail */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {selectedMessage ? (
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-medium text-gray-900">{selectedMessage.subject}</h2>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-4 border-b border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">From:</p>
                    <p className="font-medium">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email:</p>
                    <p className="font-medium">{selectedMessage.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date:</p>
                    <p>{new Date(selectedMessage.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status:</p>
                    <p>{selectedMessage.read ? 'Read' : 'Unread'}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 flex-grow">
                <p className="whitespace-pre-line">{selectedMessage.message}</p>
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <button className="bg-primary-600 text-white px-4 py-2 rounded-md">
                  Reply
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 h-full flex items-center justify-center">
              <div>
                <Mail className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p>Select a message to view its details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMessagesPage;