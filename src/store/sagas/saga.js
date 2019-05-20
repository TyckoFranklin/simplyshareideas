import { put, takeEvery } from 'redux-saga/effects'
import * as actions from '../redux/actions';
import { API, graphqlOperation, Auth, Storage } from 'aws-amplify';
import * as mutations from '../../graphql/mutations'
import * as queries from '../../graphql/queries'
import uuid from 'uuid';

// import { getNewUserGuideDefaults } from '../constants/defaults'

// function* createUserGuide() {
//     const user = yield Auth.currentAuthenticatedUser();
//     const listUsers = yield API.graphql(graphqlOperation(queries.listUsers, {
//         filter: {
//             email: {
//                 eq: user.attributes.email
//             }
//         }
//     }));
//     let newUser;
//     let newUserGuide;
//     if (listUsers.data.listUsers.items.length === 0) {
//         const newUserResult = yield API.graphql(graphqlOperation(mutations.createUser, { input: { name: user.attributes.name, email: user.attributes.email } }));
//         newUser = newUserResult.data.createUser;
//         const newUserGuideResult = yield API.graphql(graphqlOperation(mutations.createUserGuide, { input: { ...getNewUserGuideDefaults(user.attributes.name), userGuideUserId: newUser.id } }));
//         newUserGuide = newUserGuideResult.data.createUserGuide;
//         put({
//             type: actions.ADD_USER,
//             payload: new Map([
//                 [newUser.id, newUserGuide]
//             ])
//         })
//     } else {
//         newUser = listUsers.data.listUsers.items[0];
//         const listUserGuides = yield API.graphql(graphqlOperation(queries.listUserGuides, {
//             filter: {
//                 owner: {
//                     eq: newUser.owner
//                 }
//             }
//         }));
//         newUserGuide = listUserGuides.data.listUserGuides.items[0]
//     }
//     yield put({
//         type: actions.ADD_USER,
//         payload: new Map([
//             [newUser.id, newUser]
//         ])
//     })
//     yield put({
//         type: actions.CURRENT_USER,
//         payload: newUser
//     })
//     yield put({
//         type: actions.ADD_USER_GUIDES,
//         payload: new Map([
//             [newUser.id, newUserGuide]
//         ])
//     })
// }

// export function* handleCreateUserGuide() {
//     yield takeEvery(actions.CREATE_USER_GUIDE, createUserGuide);
// }

function* createSlideshow(action) {
    const result = yield API.graphql(graphqlOperation(mutations.createSlideshow, { input: { ...action.payload } }));
    console.log(result);
    yield put({
        type: actions.ADD_SLIDESHOW,
        payload: new Map([
            [result.data.createSlideshow.id, result.data.createSlideshow]
        ])
    })
}

export function* handleCreateSlideshow() {
    yield takeEvery(actions.CREATE_SLIDESHOW, createSlideshow);
}

function* createSlide(action) {
    if(action.payload.pictures){
    const filename = uuid.v4();

    const resultPicture = yield Storage.put(`${filename}_${action.payload.pictures.name}`, action.payload.pictures, {
        contentType: 'image/png',
        level: 'public',
    })
    console.log("resultPicture", resultPicture);

    const checking = yield Storage.get(resultPicture.key);
    console.log("checking", checking);

    const resultSlide = yield API.graphql(graphqlOperation(mutations.createSlide, { input: { ...action.payload, pictures: undefined, files: [resultPicture.key] } }));
    console.log("resultSlide", resultSlide);
    yield put({
        type: actions.ADD_SLIDE,
        payload: new Map([
            [resultSlide.data.createSlide.id, resultSlide.data.createSlide]
        ])
    })
} else{
    const resultSlide = yield API.graphql(graphqlOperation(mutations.createSlide, { input: { ...action.payload, pictures: undefined } }));
    console.log("resultSlide", resultSlide);
    yield put({
        type: actions.ADD_SLIDE,
        payload: new Map([
            [resultSlide.data.createSlide.id, resultSlide.data.createSlide]
        ])
    })
}

    // const resultPicture = yield API.graphql(graphqlOperation(mutations.createPicture, {input:{...action.payload, picture:undefined}}));
    // console.log(resultPicture);
    // yield put({
    //     type: actions.ADD_SLIDE,
    //     payload: new Map([
    //         [resultPicture.data.createSlide.id, resultPicture.data.createSlide]
    //     ])
    // })


}

export function* handleCreateSlide() {
    yield takeEvery(actions.CREATE_SLIDE, createSlide);
}

function* listSlideshows(action) {
    const result = yield API.graphql(graphqlOperation(queries.listSlideshows, {limit:100}));
    const payload = new Map();
    result.data.listSlideshows.items.forEach(slideshow => {
        payload.set(slideshow.id, slideshow)
    });
    yield put({
        type: actions.ADD_SLIDESHOW,
        payload
    })
}

export function* handleListSlideshows() {
    yield takeEvery(actions.LIST_SLIDESHOWS, listSlideshows);
}

function* listSlides(action) {
    const result = yield API.graphql(graphqlOperation(queries.listSlides, {limit:100}));
    console.log(result);
    const payload = new Map();
    const files = new Map();
    let filesTemp = [];
    result.data.listSlides.items.forEach(listSlides => {
        payload.set(listSlides.id, listSlides)
        if (listSlides.files) {
            listSlides.files.forEach(file => {
                filesTemp.push(file)
            });
        }
    });
    for (let file of filesTemp) {
        let url = yield Storage.get(file, {level: 'public'});
        files.set(file, url);
    }

    yield put({
        type: actions.ADD_SLIDE,
        payload
    })
    yield put({
        type: actions.ADD_FILE,
        payload: files,
    })

}

export function* handleListSlides() {
    yield takeEvery(actions.LIST_SLIDES, listSlides);
}


function* deleteSlide(action) {
    const result = yield API.graphql(graphqlOperation(mutations.deleteSlide, {input:{id:action.payload}}));
    console.log("DELETED", result);
}

export function* handleDeleteSlide() {
    yield takeEvery(actions.DELETE_SLIDE, deleteSlide);
}

function* updateSlide(action) {
    const {content,
    order,
    config} = action.payload.value;
    const result = yield API.graphql(graphqlOperation(mutations.updateSlide, {input:{id:action.payload.key, content, order,config}}));
    console.log("UPDATED", result);
}

export function* handleUpdateSlide() {
    yield takeEvery(actions.UPDATE_SLIDE, updateSlide);
}