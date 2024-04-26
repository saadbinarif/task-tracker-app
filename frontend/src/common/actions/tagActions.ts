export enum TagActions {
    FETCH_TAGS = 'FETCH_TAG',
    CREATE_TAG = 'CREATE_TAG',
    DELETE_TAG = 'DELETE_TAG'
}



//Action creators

export const fetchTag = (tags: ITag[]) => ({
    type: TagActions.FETCH_TAGS,
    payload: tags

})

export const createTag = (tag: ITag) => ({
    type: TagActions.CREATE_TAG,
    payload: tag

})

export const deleteTag = (tagId: string) => ({
    type: TagActions.DELETE_TAG,
    payload: tagId,
});