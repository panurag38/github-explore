module.exports = {
  footerContainer: { flex: 1, flexDirection: 'row', backgroundColor: 'white', height: 50, position: 'absolute', bottom: 0, left: 0, right: 0, borderTopWidth: 1, borderTopColor: '#e4eaef', elevation: 2},
  
  footerItem: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 4, marginBottom: 4},
  
  searchContainer: { height: 36, backgroundColor: 'white', margin: 12, borderWidth: 1, borderRadius: 24, borderColor: 'black', elevation: 3, shadowOffset: {
    width: 1, height: 1, }, shadowColor: '#333', shadowOpacity: 0.4, shadowRadius: 2 },
  searchContent: { display: 'flex', flexDirection: 'row', margin: 8, justifyContent: 'center', alignItems: 'center'},
  textInputWrapper: { display: 'flex', flex: 1, justifyContent: 'center', marginLeft: 4, marginRight: 4 },

  listItem: { flex: 1, padding: 12, backgroundColor: 'white', height: 145, border: 1, borderColor: 'black', margin: 10, borderRadius: 16, elevation: 2, shadowOffset: {
    width: 1, height: 1, }, shadowColor: '#333', shadowOpacity: 0.3, shadowRadius: 2 },
  
  listName: { fontSize: 16, color:'black', fontWeight: 'bold', marginBottom: 6 },
  listDesc: { fontSize: 12, color:'#455e94', marginBottom: 6 },
  issueWrapper: {flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end', marginTop: 2},
  newIssue: { color: 'darkgrey', fontSize: 14, fontWeight: 'bold', paddingTop: 5},
  
  bookmarkBtn: { flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: 10},
  btnWrapper: { display: 'flex', flexDirection: 'row' },
  addBookmark: { fontSize: 12, color: '#708424', paddingTop: 5, fontWeight: 'bold' },
  delBookmark: { fontSize: 12, color: 'red', paddingTop: 5, fontWeight: 'bold' },
};