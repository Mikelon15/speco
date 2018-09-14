// This object provides the styling information for our custom color
// styles.
export const colorStyleMap = {
    red: {
        color: 'rgba(255, 0, 0, 1.0)',
    },
    orange: {
        color: 'rgba(255, 127, 0, 1.0)',
    },
    yellow: {
        color: 'rgba(180, 180, 0, 1.0)',
    },
    green: {
        color: 'rgba(0, 180, 0, 1.0)',
    },
    blue: {
        color: 'rgba(0, 0, 255, 1.0)',
    },
    indigo: {
        color: 'rgba(75, 0, 130, 1.0)',
    },
    violet: {
        color: 'rgba(127, 0, 255, 1.0)',
    },
};

export const styles = {
    root: {
        itemsAlign: 'center',
        marginTop: '17vh',
        backgroundColor: '##f5f5f5f2',
        fontFamily: '\'Georgia\', serif',
        fontSize: 14,
        padding: 20,
        width: '95%',
        height: '75vh',
        borderRadius: '10px'
    },
    editor: {
        borderTop: '1px solid #ddd',
        cursor: 'text',
        fontSize: 16,
        marginTop: 5,
        minHeight: 100,
        paddingTop: 10,
    },
    controls: {
        fontFamily: '\'Helvetica\', sans-serif',
        fontSize: 14,
        marginBottom: 10,
        userSelect: 'none',
        flexWrap: 'wrap',
        display: 'flex'
    },
    styleButton: {
        color: '#999',
        cursor: 'pointer',
        padding: '2px 0',
    },
    title: {
        float: 'left',
        textAlign: 'left',
        marginBottom: '5px'
    },
    time: {
        fontSize: '10px',
        float: 'right',
        width: '60%',
        position: 'absolute',
        top: '0',
        right: '0',
        textAlign: 'right',
        padding: '5px',
        color: '#bbb',
    },
    header: {
        paddingBottom: '20px'
    },
    addButton: {
        position: 'absolute',
        bottom: '100px',
        right: '20px'
    }
};