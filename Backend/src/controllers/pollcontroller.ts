// src/controllers/pollController.ts
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { DbHelper } from '../databasehelpers';
import { PollOption, PollRequest, Poll } from '../models/pollmodel';



const dbHelper = new DbHelper();

export const addPoll = async (req: PollRequest, res: Response) => {
    const { title, question, options } = req.body;
    const id = uuidv4();

    try {
        await dbHelper.exec('AddPoll', { id, title, question, totalVotes: 0 });

        for (const option of options) {
            await dbHelper.exec('AddPollOption', {
                pollId: id,
                label: option.label,
                percentage: 0,
                votes: 0
            });
        }

        res.status(201).send({ message: 'Poll added successfully' });
    } catch (error) {
        console.error('Error adding poll:', error);
        res.status(500).send({ error: 'Failed to add poll' });
    }
};

// export const getPolls = async (req: PollRequest, res: Response) => {
//     try {
//         // Assuming `GetPolls` returns multiple recordsets in a single result
//         const result = await dbHelper.exec('GetPolls', {});

//         // Cast recordsets to arrays
//         const polls = result.recordset as Poll[];
//         const pollOptions = result.recordset as PollOption[];  // Ensure this is the correct index

//         // Format polls with their options
//         const formattedPolls = polls.map((poll: Poll) => ({
//             ...poll,
//             options: pollOptions.filter((option: PollOption) => option.pollId === poll.id)  // Ensure this matches your data
//         }));

//         res.status(200).json(formattedPolls);
//     } catch (error: any) {
//         console.error('Error fetching polls:', error.message);
//         res.status(500).json({ error: 'Failed to fetch polls' });
//     }
// };

export const getPolls = async (req: PollRequest, res: Response) => {
    try {
        const result = await dbHelper.exec('GetPolls', {});
        const polls = result.recordset as (Poll & { options: PollOption[] })[];  // Assuming the options are included in each poll

        res.status(200).json(polls);
    } catch (error: any) {
        console.error('Error fetching polls:', error.message);
        res.status(500).json({ error: 'Failed to fetch polls' });
    }
};

export const deletePoll = async (req: PollRequest, res: Response) => {
    const { id } = req.params;

    try {
        await dbHelper.exec('DeletePoll', { id });
        res.status(200).send({ message: 'Poll deleted successfully' });
    } catch (error) {
        console.error('Error deleting poll:', error);
        res.status(500).send({ error: 'Failed to delete poll' });
    }
};
