import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import StickyNote from '../models/StickyNote';

export default {
    async index(req: Request, res: Response) {
        const stickyNotesRepository = getRepository(StickyNote);

        const stickyNotes = await stickyNotesRepository.find();

        return res.json(stickyNotes);
    },
    async show(req: Request, res: Response) {
        const { id } = req.params;
        const stickyNotesRepository = getRepository(StickyNote);

        if (!await stickyNotesRepository.findOne(id)) {
            return res.status(400).json(Error("Sticky Note doesn't exist").message);
        }

        const stickyNote = await stickyNotesRepository.findOneOrFail(id);

        return res.json(stickyNote);
    },
    async create(req: Request, res: Response) {
        const { title, description } = req.body;

        const stickyNotesRepository = getRepository(StickyNote);

        const stickyNote = stickyNotesRepository.create({ title, description });

        await stickyNotesRepository.save(stickyNote);

        return res.status(201).json(stickyNote);
    },
    async update(req: Request, res: Response) {
        const { id, title, description } = req.body;
        const stickyNotesRepository = getRepository(StickyNote);

        const stickyNote = await stickyNotesRepository.findOne(id);

        if (!stickyNote) {
            return res.status(400).json(Error("Sticky Note doesn't exist").message);
        }

        stickyNote.title = title.trim() ? title : stickyNote.title;
        stickyNote.description = description.trim() ? description : stickyNote.description;

        await stickyNotesRepository.save(stickyNote);

        return res.json(stickyNote);
    },
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const stickyNotesRepository = getRepository(StickyNote);

        if (!await stickyNotesRepository.findOne(id)) {
            return res.status(400).json(Error("Sticky Note doesn't exist").message);
        }

        await stickyNotesRepository.delete(id);

        return res.status(204).end();
    },
};