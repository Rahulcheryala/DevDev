type Props = {
  content: string;
};

const SMSContent = ({ content }: Props) => {
  return (
    <>
      <div className="space-y-10">
        <div className="relative bg-[hsl(var(--gray-2),_0.2)] py-4 px-6 rounded-md">
          <p className="text-accent-dark text-sm">{content}</p>
          <img
            src="/images/message-arrow.svg"
            alt="..."
            className="absolute -left-[6px] bottom-0"
          />
        </div>
      </div>
    </>
  );
};

export default SMSContent;
