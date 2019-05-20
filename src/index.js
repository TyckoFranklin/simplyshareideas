import React from 'react';
import ReactDOM from 'react-dom';
import Amplify, { Storage } from 'aws-amplify';
import './index.css';
import Main from './views/Main';

import aws_exports from './aws-exports';
Amplify.configure(aws_exports);
Storage.configure({
    AWSS3: {
        bucket: aws_exports.aws_user_files_s3_bucket,//Your bucket name;
        region: aws_exports.aws_user_files_s3_bucket_region//Specify the region your bucket was created in;
    }
});


ReactDOM.render(
    <Main />
, document.getElementById('root'));
