import * as React from "react";
import { StoreRoot } from "@scena/react-store";
import { LayersProvider } from "./context/LayersContext";
import { EditorProvider } from "./context/EditorContext";
import "./assets/styles/editor.css";
import "./assets/styles/font.css";
import { CommentsProvider } from "./context/CommentContext";

import EditorManager from "./components/managers/editor-manager/EditorManager";
// import { commentService } from "../../services/CommentApi";

export type IEditorProps = {
  width: number;
  height: number;
  unit: string;
  name: string;
  onSave: (args: any, thumbnail: any) => void;
  savedDocument?: any;
  status: string;
  isFavourite: boolean;
  saveStatus: string;
  quillDefaultValues?: { [key: string]: any };
  username?: string;
  lastUpdated?: string;
  avatarUrl?: string;
  companyID?: string;
  userDetails?: any;
  labelId: string;
  isDocument?: boolean;

  onDashboardClick?: (args?: any) => void;
  onDesignerClick?: (args?: any) => void;
  onTemplatesClick?: (args?: any) => void;
  onElementsClick?: (args?: any) => void;
  onBrandingClick?: (args?: any) => void;
  onProjectsClick?: (args?: any) => void;
  onUploadsClick?: (args?: any) => void;
  onDataClick?: (args?: any) => void;
  onControlsClick?: (args?: any) => void;
  getThumbnail?: (args?: any) => string;
  onStatusChange?: (args: string) => void;
  onFavoriteClick?: (args?: boolean) => void;
  onLabelNameChange?: (args: string) => void;
  labelComments: any;
};

const name = {
  id: "ada58738-0769-4f93-b40c-c6d54603d705",
  firstName: "Sudhanshu",
  lastName: "Singh",
  fullName: "Sudhanshu Singh",
};
export default function Editor(props: IEditorProps) {
  return (
    <StoreRoot>
      <LayersProvider>
        <EditorProvider>
          <CommentsProvider labelComments={props.labelComments}>
            <EditorManager
              width={props.width}
              height={props.height}
              unit={props.unit}
              name={props.name}
              username={props.username}
              lastUpdated={props.lastUpdated}
              avatarUrl={props.avatarUrl}
              onSave={props.onSave}
              savedDocument={props.savedDocument}
              onDashboardClick={props.onDashboardClick}
              onDesignerClick={props.onDesignerClick}
              onTemplatesClick={props.onTemplatesClick}
              onElementsClick={props.onElementsClick}
              onBrandingClick={props.onBrandingClick}
              onProjectsClick={props.onProjectsClick}
              onUploadsClick={props.onUploadsClick}
              onDataClick={props.onDataClick}
              onControlsClick={props.onControlsClick}
              quillDefaultValues={props.quillDefaultValues}
              getThumbnail={props.getThumbnail}
              onStatusChange={props.onStatusChange}
              status={props.status}
              isFavourite={props.isFavourite}
              saveStatus={props.saveStatus}
              onFavoriteClick={props.onFavoriteClick}
              onLabelNameChange={props.onLabelNameChange}
              labelComments={props.labelComments}
              companyID={props.companyID}
              userDetails={props.userDetails || name}
              labelId={props.labelId}
              isDocument={props.isDocument}
            />
          </CommentsProvider>
        </EditorProvider>
      </LayersProvider>
    </StoreRoot>
  );
}
