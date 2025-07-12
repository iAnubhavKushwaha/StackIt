import DOMPurify from 'dompurify';

const SanitizedHTML = ({ content }) => {
  const sanitizedContent = content ? DOMPurify.sanitize(content) : '';
  
  return (
    <div 
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default SanitizedHTML;