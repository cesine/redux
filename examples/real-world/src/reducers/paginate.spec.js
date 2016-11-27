import paginate from './paginate'

describe('paginate reducer', () => {
  it('should handle initial state', () => {
    const types = ['foo', 'bar', 'too'];
    const mapActionToKey = function() {
      return 'foo';
    };
    const paginationReducer = paginate({
      types,
      mapActionToKey
    });

    const mockState = {
      something: 1
    };
    expect(paginationReducer(mockState, {
      type: 'foo'
    })).toEqual({
      foo: {
        isFetching: true,
        nextPageUrl: undefined,
        pageCount: 0,
        ids: []
      },
      something: 1
    });
  });
});
