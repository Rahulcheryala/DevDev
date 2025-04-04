type Props = {
  content: string;
  subject: string;
};
const EmailContent = ({ content, subject }: Props) => {
  return (
    <>
      <div className="space-y-10 grid grid-cols-1">
        <div className="relative h-full bg-[hsl(var(--stroke-primary),_0.5)] p-6 rounded-md">
          <div className="mb-10">
            <h4 className="text-sm mb-3 text-accent-dark">
              <span className="font-medium me-1">To:</span>Example contact
            </h4>
            <h4 className="text-sm text-accent-dark">
              <span className="font-medium me-1">Subject:</span>
              {subject}
            </h4>
          </div>
          <p className="text-textLink text-sm">{content}</p>
        </div>
      </div>
    </>
  );
};

export default EmailContent;
