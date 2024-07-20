import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { DbHelper } from '../databasehelpers'; // Adjust this import based on your actual path
import { View } from '../models/viewsmodel';


const dbHelper = new DbHelper();

// export const addView = async (req: Request, res: Response) => {
//     const { Username, Location, Role, ViewText } = req.body;

//     try {
//         await dbHelper.addView(Username, Location, Role, ViewText);
//         res.status(201).send({ message: 'View added successfully' });
//     } catch (error) {
//         console.error('Error adding view:', error);
//         res.status(500).send({ error: 'Failed to add view' });
//     }
// };

export const addView = async (req: Request, res: Response) => {
    const { Username, Location, Role, ViewText } = req.body;

    try {
        console.log("Request Body: ", req.body);

        // Validate request body
        if (!Username || !Location || !Role || !ViewText) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Call the DbHelper to insert the view
        await dbHelper.addView(Username, Location, Role, ViewText);

        // Respond with success message
        res.status(201).json({ message: 'View added successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
export const getViews = async (req: Request, res: Response) => {
    try {
        const viewResults = await dbHelper.getViews();
        const views = viewResults.recordset as any[]; // Adjust the type based on your schema
        res.status(200).send(views);
    } catch (error) {
        console.error('Error fetching views:', error);
        res.status(500).send({ error: 'Failed to fetch views' });
    }
};

// export const addView = async (req: Request, res: Response) => {
//     const { username, location, role, content } = req.body;
//     const id = uuidv4();

//     try {
//         await dbHelper.exec('AddView', { id, username, location, role, content });
//         res.status(201).send({ message: 'View added successfully' });
//     } catch (error) {
//         console.error('Error adding view:', error);
//         res.status(500).send({ error: 'Failed to add view' });
//     }
// };

// export const getViews = async (req: Request, res: Response) => {
//     try {
//         const viewResults = await dbHelper.exec('EXEC GetViews',{});
//         const views = viewResults.recordset as View[];
//         res.status(200).send(views);
//     } catch (error) {
//         console.error('Error fetching views:', error);
//         res.status(500).send({ error: 'Failed to fetch views' });
//     }
// };
