type PreviewFontProps = {
  selectedFont: string | null;
};

const PreviewFont = ({ selectedFont }: PreviewFontProps) => {
  return (
    <>
      <div className="px-8">
        <h4 className="text-sm mb-6">Preview</h4>
        <div className="px-[80px] py-[40px] border border-dashed border-tertiary rounded-lg min-h-[calc(100vh_-_400px)] flex items-center justify-center">
          {!selectedFont ? (
            <p className="text-sm text-secondary text-center">
              Select font to see preview
            </p>
          ) : (
            <div style={{ fontFamily: selectedFont || "inherit" }}>
              {/* Applying font family in this div  */}
              <h3 className="mb-3 text-5xl">Suisse Neue</h3>
              <h4 className="mb-3 text-4xl">ABCDEFGHIJKLM NOPQRSTUVWXYZ</h4>
              <h5 className="mb-3 text-3xl">abcdefghijklm nopqrstuvwxyz</h5>
              <h6 className="mb-3 text-2xl">0123456789</h6>
              <p className="mb-2 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cilium dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est
                laborum.Lorem ipsum dolor sit amet, consectetur adipisicing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PreviewFont;
