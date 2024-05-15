export enum TagActions {
    FETCH_TAGS_REQUEST = 'FETCH_TAG_REQUEST',
    FETCH_TAGS_SUCCESS = 'FETCH_TAG_SUCCESS',
    FETCH_TAGS_FAILURE= 'FETCH_TAG_FAILURE',
    CREATE_TAG_REQUEST = 'CREATE_TAG_REQUEST',
    CREATE_TAG_SUCCESS = 'CREATE_TAG_SUCCESS',
    CREATE_TAG_FAILURE = 'CREATE_TAG_FAILURE',
    DELETE_TAG = 'DELETE_TAG'
}



//Action creators

export const fetchTagRequest = () => ({
    type: TagActions.FETCH_TAGS_REQUEST,
    

})

export const fetchTagSuccess = (tags: any) => ({
    type: TagActions.FETCH_TAGS_SUCCESS,
    payload: tags

})

export const fetchTagFailure = (error: any) => ({
    type: TagActions.FETCH_TAGS_FAILURE,
    payload: error
})

export const CREATE_TAG_REQUEST = (tagId: any) => ({
    type: TagActions.CREATE_TAG_REQUEST,
    payload: tagId

})

export const createTagSuccess = (tag: any) => ({
    type: TagActions.CREATE_TAG_SUCCESS,
    payload: tag

})

export const createTagFailure = (error:any) => ({
    type: TagActions.CREATE_TAG_FAILURE,
    payload: error

})

export const deleteTag = (tagId: string) => ({
    type: TagActions.DELETE_TAG,
    payload: tagId,
});