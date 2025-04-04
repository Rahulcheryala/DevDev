import {
  DefaultQuillObject,
  ScenaElementLayer,
  ScenaElementLayerGroup,
  SetQuillDefaultValues,
} from "../../../../types";
import {
  alignStyles,
  textFontSizes,
  textFontStyles,
  textFontWeight,
} from "../../../../utils/config";
import { identifyLayer } from "../../../../utils/shared/LayerUtils";
import Quill from "quill";

// Quill utils
export const initializeQuillListener = (
  layers: any[],
  handleClick: (e: any) => void,
) => {
  const quillEditors: any[] = [];

  try {
    layers.forEach((layer) => {
      let quillEditor = null;
      const layerRef = layer.jsx?.props?.children?.ref;

      if (layerRef?.current) {
        quillEditor = layerRef.current;
      }

      if (quillEditor?.getEditor && quillEditor?.getEditor()?.root) {
        const editorRoot = quillEditor.getEditor().root;
        editorRoot.addEventListener("dblclick", handleClick);
        quillEditors.push(quillEditor); // Store the editor for cleanup
      }
    });
  } catch (error) {
    console.error(error);
  }
};
export const handleQuillSelectionChange = (
  quillRef: React.RefObject<any>,
  setTextFormatting: (formats: any) => void,
) => {
  if (quillRef?.current) {
    const quill = quillRef.current.getEditor();

    // Add selection-change listener
    quill.on("selection-change", (range: { index: number; length: number }) => {
      if (range) {
        const { index, length } = range;

        const formats =
          quill.getSelection().length === 0
            ? quill.getFormat(index)
            : quill.getFormat(index, length);

        // Parse lineSpacing and letterSpacing
        formats.lineSpacing = formats.lineSpacing
          ? parseInt(formats.lineSpacing.replace("px", ""), 10)
          : 0;
        formats.letterSpacing = formats.letterSpacing
          ? parseInt(formats.letterSpacing.replace("px", ""), 10)
          : 0;

        // Get list style information
        const listStyle = quill.getFormat(index, length, "list");
        formats.listStyle = listStyle;
        formats.case = listStyle?.case || "";

        // Adjust vertical spacing if it already exists
        const offsetVerticalSpacing = formats.lineSpacing
          ? parseInt(formats.lineSpacing as string, 10) - 16
          : 0;

        setTextFormatting({
          ...formats,
          lineSpacing: offsetVerticalSpacing,
        });
      }
    });
  }
};

export const manageLayerFocusAndCleanup = (
  selectedLayers: (ScenaElementLayer | ScenaElementLayerGroup)[],
  setSelectedTool: (tool: string) => void,
  setAndFocusQuillRef: (
    selectedLayer: (ScenaElementLayer | ScenaElementLayerGroup)[],
    setQuillRef: (ref: any) => void,
  ) => any,
  setQuillRef: (ref: any) => void,
) => {
  let quillInstance: any;
  let layerType: string;
  let layer: ScenaElementLayer | ScenaElementLayerGroup;

  if (selectedLayers.length) {
    layerType = identifyLayer(selectedLayers);
    layer = selectedLayers[0];

    // Set and focus Quill ref
    quillInstance = setAndFocusQuillRef(selectedLayers, setQuillRef);
  } else {
    setSelectedTool("");
  }

  // Cleanup function
  return () => {
    // Clear table selection when the table layer is out of focus
    if (layerType === "table") {
      const tableRef = (layer as ScenaElementLayer)?.jsx.props.children.ref;
      if (tableRef?.current) {
        tableRef.current.clearCellSelection();
      }
    }

    // Handle Quill instance cleanup
    if (quillInstance) {
      quillInstance.blur();
      const editorContainer = quillInstance.root;
      editorContainer.style.pointerEvents = "none";
    }
  };
};

export const initializeTableLayers = (layers: any[]) => {
  try {
    // Filter table layers and assign header visibility and merged cells
    const tableLayers = layers.filter(
      (layer) => layer.title && layer.title === "table",
    );

    if (tableLayers.length) {
      tableLayers.forEach((tableLayer) => {
        const { isHeaderVisible, mergedCells } = tableLayer.metaData;

        // Set header visibility and merged cells via table ref
        const tableRef = tableLayer?.jsx?.props?.children?.ref;
        if (tableRef?.current) {
          tableRef.current.setHeaderVisibility(isHeaderVisible);
          if (mergedCells) {
            tableRef.current.setMergedCells(mergedCells);
          }
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const setAndFocusQuillRef = (
  selectedLayer: (ScenaElementLayer | ScenaElementLayerGroup)[],
  setQuillRef: (ref: any) => void,
) => {
  if (!selectedLayer.length) return;

  const layerType = identifyLayer(selectedLayer);
  if (layerType !== "text") return;

  // Determine the ref based on layer type
  const isGroup =
    (selectedLayer[0] as ScenaElementLayerGroup)?.type === "group";
  const ref = isGroup
    ? (selectedLayer[0] as any)?.children[0]?.jsx?.props?.children?.ref
    : (selectedLayer[0] as ScenaElementLayer)?.jsx?.props?.children?.ref;

  if (ref?.current) {
    const quillInstance = ref.current.getEditor();
    const editorContainer = quillInstance.root;

    // Enable text editing by setting pointer-events
    editorContainer.style.pointerEvents = "auto";

    setQuillRef(ref.current);
    ref.current.focus();
    return quillInstance;
  }
};
export const setDefaultQuillInstances = (
  setQuillDefaultValues: SetQuillDefaultValues,
  defaultQuillObject: DefaultQuillObject = {
    textFontSizes: [],
    textFontStyles: [],
    isListStyle: false,
  },
) => {
  // Define custom formats if they are not already defined by Quill
  const SizeStyle = Quill.import("attributors/style/size");

  const filteredTextFontSizes = defaultQuillObject?.textFontSizes?.filter(
    (item: string) => item !== "undefinedpx",
  );
  defaultQuillObject.textFontSizes = filteredTextFontSizes;
  SizeStyle.whitelist = defaultQuillObject.textFontSizes.length
    ? defaultQuillObject.textFontSizes
    : textFontSizes;
  setQuillDefaultValues(defaultQuillObject);

  const Font = Quill.import("attributors/style/font");
  const Align = Quill.import("attributors/style/align");
  const Parchment = Quill.import("parchment");

  if (typeof Parchment !== "undefined") {
    const LetterSpacingStyle = new Parchment.Attributor.Style(
      "letterSpacing",
      "letter-spacing",
      {
        scope: Parchment.Scope.INLINE,
        whitelist: null,
      },
    );

    const LineSpacingStyle = new Parchment.Attributor.Style(
      "lineSpacing",
      "line-height",
      {
        scope: Parchment.Scope.BLOCK,
        whitelist: null,
      },
    );

    const CaseStyle = new Parchment.Attributor.Style("case", "text-transform", {
      scope: Parchment.Scope.INLINE,
      whitelist: ["none", "lowercase", "uppercase", "capitalize"],
    });

    // Adding font weight functionality
    const FontWeightStyle = new Parchment.Attributor.Style(
      "fontWeight",
      "font-weight",
      {
        scope: Parchment.Scope.INLINE,
        whitelist: textFontWeight,
      },
    );

    Quill.register(LetterSpacingStyle, true);
    Quill.register(CaseStyle, true);
    Quill.register(LineSpacingStyle, true);
    Quill.register(FontWeightStyle, true);
  }

  Font.whitelist = defaultQuillObject.textFontStyles.length
    ? defaultQuillObject.textFontStyles
    : textFontStyles;
  Align.whitelist = alignStyles;
  Quill.register(Align, true);
  Quill.register(Font, true);
  Quill.register(SizeStyle, true);
};
