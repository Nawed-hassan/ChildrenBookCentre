import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTrash, FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { contactApi } from '../utils/api';
import { formatDate } from '../utils/helpers';

const ManageContact = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await contactApi.getMessages();
      setMessages(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching messages');
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      await contactApi.delete(id);
      toast.success('Message deleted successfully');
      fetchMessages();
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      toast.error('Error deleting message');
      console.error('Error:', error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await contactApi.markAsRead(id);
      fetchMessages();
    } catch (error) {
      toast.error('Error marking message as read');
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <Header>
        <h1>Contact Messages</h1>
      </Header>

      {loading ? (
        <LoadingMessage>Loading messages...</LoadingMessage>
      ) : (
        <ContentLayout>
          <MessagesList>
            {messages.map(message => (
              <MessageItem
                key={message._id}
                isUnread={!message.isRead}
                isSelected={selectedMessage?._id === message._id}
                onClick={() => setSelectedMessage(message)}
              >
                <MessageHeader>
                  <div>
                    <SenderName>{message.name}</SenderName>
                    <MessageDate>{formatDate(message.createdAt)}</MessageDate>
                  </div>
                  <MessageActions>
                    {!message.isRead && (
                      <ActionButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsRead(message._id);
                        }}
                        title="Mark as read"
                      >
                        <FaEnvelope />
                      </ActionButton>
                    )}
                    <ActionButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(message._id);
                      }}
                      title="Delete"
                    >
                      <FaTrash />
                    </ActionButton>
                  </MessageActions>
                </MessageHeader>
                <MessageSubject>{message.subject}</MessageSubject>
              </MessageItem>
            ))}
          </MessagesList>

          <MessageDetail>
            {selectedMessage ? (
              <>
                <DetailHeader>
                  <h2>{selectedMessage.subject}</h2>
                  <DetailMeta>
                    <div>
                      <strong>From:</strong> {selectedMessage.name} ({selectedMessage.email})
                    </div>
                    <div>
                      <strong>Date:</strong> {formatDate(selectedMessage.createdAt)}
                    </div>
                  </DetailMeta>
                </DetailHeader>
                <MessageContent>
                  {selectedMessage.message}
                </MessageContent>
              </>
            ) : (
              <NoMessageSelected>
                <FaEnvelopeOpen size={48} />
                <p>Select a message to read</p>
              </NoMessageSelected>
            )}
          </MessageDetail>
        </ContentLayout>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    color: #3c2415;
  }
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  height: calc(100vh - 200px);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const MessagesList = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const MessageItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  background-color: ${props => props.isSelected ? '#f4f1ea' : props.isUnread ? '#fff' : '#fafafa'};
  
  &:hover {
    background-color: ${props => props.isSelected ? '#f4f1ea' : '#f8f5f1'};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

const SenderName = styled.div`
  font-weight: 600;
  color: #3c2415;
`;

const MessageDate = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const MessageSubject = styled.div`
  color: #333;
  font-size: 0.9rem;
`;

const MessageActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.2rem;
  
  &:hover {
    color: #3c2415;
  }
`;

const MessageDetail = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  overflow-y: auto;
`;

const DetailHeader = styled.div`
  margin-bottom: 2rem;
  
  h2 {
    color: #3c2415;
    margin-bottom: 1rem;
  }
`;

const DetailMeta = styled.div`
  color: #666;
  font-size: 0.9rem;
  
  div {
    margin-bottom: 0.5rem;
  }
  
  strong {
    color: #3c2415;
  }
`;

const MessageContent = styled.div`
  color: #333;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const NoMessageSelected = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  gap: 1rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

export default ManageContact;