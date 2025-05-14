import styled from 'styled-components';

const About = () => {
  return (
    <AboutContainer>
      <HeroSection>
        <h1>About Our Bookshop</h1>
        <p>A locally owned independent bookstore with a passion for literature</p>
      </HeroSection>

      <ContentSection>
        <StorySection>
          <h2>Our Story</h2>
          <p>
            Founded in 2010, our bookshop began as a small corner store with a simple mission: 
            to connect readers with books they'll love. Over the years, we've grown into a 
            community hub for book lovers of all ages and backgrounds.
          </p>
          <p>
            What sets us apart is our carefully curated selection of books, our knowledgeable 
            staff, and our commitment to fostering a love of reading in our community. We believe 
            that books have the power to inspire, educate, and transform lives.
          </p>
        </StorySection>

        <ImageSection>
          <img 
            src="https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Bookstore interior with wooden shelves filled with books" 
          />
        </ImageSection>

        <MissionSection>
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide a welcoming space where readers can discover new books, 
            connect with fellow book lovers, and engage with authors and ideas. We strive to:
          </p>
          <MissionList>
            <MissionItem>Curate a diverse and inclusive collection of books</MissionItem>
            <MissionItem>Support local and independent authors</MissionItem>
            <MissionItem>Host engaging events and book clubs</MissionItem>
            <MissionItem>Provide personalized recommendations</MissionItem>
            <MissionItem>Create a warm and inviting atmosphere for all</MissionItem>
          </MissionList>
        </MissionSection>

        <TeamSection>
          <h2>Our Team</h2>
          <p>
            Our passionate team of booksellers brings a wealth of knowledge and enthusiasm to 
            help you find your next great read. Each team member specializes in different genres 
            and topics, ensuring that whatever your reading interests, we can guide you to books 
            you'll love.
          </p>
        </TeamSection>

        <QuoteSection>
          <Blockquote>
            "A room without books is like a body without a soul."
            <QuoteAuthor>— Cicero</QuoteAuthor>
          </Blockquote>
        </QuoteSection>

        <CommunitySection>
          <h2>Community Involvement</h2>
          <p>
            We believe in giving back to the community that has supported us. We regularly 
            partner with local schools, libraries, and nonprofit organizations to promote 
            literacy and access to books for all. Our annual book drives have donated 
            thousands of books to children and families in need.
          </p>
        </CommunitySection>
      </ContentSection>
    </AboutContainer>
  );
};

const AboutContainer = styled.div``;

const HeroSection = styled.section`
  background-color: #f4f1ea;
  padding: 4rem 2rem;
  text-align: center;
  
  h1 {
    font-size: 2.5rem;
    color: #3c2415;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ContentSection = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 2rem;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const StorySection = styled.div`
  margin-bottom: 3rem;
  
  h2 {
    font-size: 2rem;
    color: #3c2415;
    margin-bottom: 1.5rem;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;
    margin-bottom: 1.5rem;
  }
`;

const ImageSection = styled.div`
  margin: 3rem 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const MissionSection = styled.div`
  margin-bottom: 3rem;
  
  h2 {
    font-size: 2rem;
    color: #3c2415;
    margin-bottom: 1.5rem;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;
    margin-bottom: 1.5rem;
  }
`;

const MissionList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const MissionItem = styled.li`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
  padding-left: 2rem;
  position: relative;
  margin-bottom: 1rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5rem;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #3c2415;
  }
`;

const TeamSection = styled.div`
  margin-bottom: 3rem;
  
  h2 {
    font-size: 2rem;
    color: #3c2415;
    margin-bottom: 1.5rem;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;
  }
`;

const QuoteSection = styled.div`
  margin: 4rem 0;
  text-align: center;
`;

const Blockquote = styled.blockquote`
  font-size: 1.8rem;
  font-style: italic;
  color: #3c2415;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.4;
`;

const QuoteAuthor = styled.cite`
  display: block;
  font-size: 1.2rem;
  margin-top: 1rem;
  color: #666;
  font-style: normal;
`;

const CommunitySection = styled.div`
  margin-bottom: 3rem;
  
  h2 {
    font-size: 2rem;
    color: #3c2415;
    margin-bottom: 1.5rem;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;
  }
`;

export default About;