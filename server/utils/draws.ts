import type { IStroke } from '../types';

export const filterExistingStrokes = (dbStrokes: IStroke[], strokes: IStroke[]) => {
    for(let i = 0; i < dbStrokes.length; i++) {
        const dbStroke = dbStrokes[i];
        for(let j = 0; j < strokes.length; j++) {
            const stroke = strokes[j];
            if(JSON.stringify(dbStroke.points) === JSON.stringify(stroke.points)) {
                strokes.splice(j, 1)
            }
        }
    }
    console.log("filter: ", strokes)
    return strokes
}

export const deleteUnnecessary = (arr) => {
    for(let i = 0; i < arr.length; i++) {
        const item = arr[i];
        delete item.id
        delete item.createdAt
        delete item.updatedAt
        delete item.drawingId
        delete item.strokeId
    }
}