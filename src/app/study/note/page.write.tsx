import React, {useState} from 'react';
/* import { CKEditor } from '@ckeditor/ckeditor5-react'; */
/* import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
 */
const MyEditorComponent = () => {
    const [editorData, setEditorData] = useState('');

    const handleEditorDataChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
    };

    return (
        <div>
            {/* <CKEditor
            editor={ClassicEditor}
            data={editorData}
            onChange={handleEditorDataChange}
            /> */}
        </div>
    );
};

export default MyEditorComponent;