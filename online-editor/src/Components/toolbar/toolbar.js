import React, {Component} from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Modal, Text, FontWeights, getTheme, mergeStyleSets, FontSizes } from 'office-ui-fabric-react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import './toolbar.css'

//icons for fabric ui
initializeIcons();

const theme = getTheme();
const contentStyles = mergeStyleSets({
    container: {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'stretch'
    },
    header: [
      theme.fonts.xLargePlus,
      {
        flex: '1 1 auto',
        borderTop: `4px solid ${theme.palette.themePrimary}`,
        color: theme.palette.neutralPrimary,
        display: 'flex',
        fontSize: FontSizes.xLarge,
        alignItems: 'center',
        fontWeight: FontWeights.semibold,
        padding: '12px 12px 14px 24px'
      }
    ],
    body: {
      flex: '4 4 auto',
      padding: '0 24px 24px 24px',
      overflowY: 'hidden',
      selectors: {
        p: {
          margin: '14px 0'
        },
        'p:first-child': {
          marginTop: 0
        },
        'p:last-child': {
          marginBottom: 0
        }
      }
    }
  });
  

export default class Toolbar extends Component {

    state = {
        isModalOpen: false,
        fileUploaded: false,
        files: []
    }

    handleUpload = () => {
        this.setState({isModalOpen: true})
    }

    _closeModal = () => {
        this.setState({isModalOpen: false})
    }

    _items = [
        {
          key: 'upload',
          text: 'Upload',
          iconProps: { iconName: 'Upload' },
          onClick: this.handleUpload
        },
        {
          key: 'download',
          text: 'Download',
          iconProps: { iconName: 'Download' },
          onClick: () => console.log('Download')
        }
      ];
      
    _farItems = [
        {
          key: 'tile',
          text: 'Grid view',
          // This needs an ariaLabel since it's icon-only
          ariaLabel: 'Grid view',
          iconOnly: true,
          iconProps: { iconName: 'Tiles' },
          onClick: () => console.log('Tiles')
        },
        {
          key: 'info',
          text: 'Info',
          // This needs an ariaLabel since it's icon-only
          ariaLabel: 'Info',
          iconOnly: true,
          iconProps: { iconName: 'Info' },
          onClick: () => console.log('Info')
        }
    ];
    
    render() {
        return (
            <div>
            <CommandBar
                items={this._items}
                overflowItems={this._overflowItems}
                overflowButtonProps={this.overflowProps}
                farItems={this._farItems}
                ariaLabel="Use left and right arrow keys to navigate between commands"
            />
            <Modal
                isOpen={this.state.isModalOpen}
                isBlocking={false}
                onDismiss={this._closeModal}
            >
                <div className={contentStyles.header}>
                    <span>Upload a file to edit</span>
                </div>
                <FilePond 
                    required={true} 
                    allowBrowse={true} 
                    allowMultiple={true} 
                    allowPaste={true} 
                    allowDrop={true} 
                    dropOnPage={true}
                    maxFiles={1}
                    ref={ref => this.pond = ref}
                    files={this.state.files}
                    className="fileUploadBox"
                    onupdatefiles={fileItems => {
                        this.setState({
                          files: fileItems.map(fileItem => fileItem.file)
                        });
                        this.props.onFileUpload(fileItems[0].file)
                      }}    
                    />
            </Modal>
            </div>
        );
    }
};
