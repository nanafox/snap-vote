import { getAllPolls, getPollById, addPoll, updatePoll, deletePoll } from '@/lib/polls/storage';

describe('Poll Storage', () => {
  it('should return all polls', () => {
    const polls = getAllPolls();
    expect(Array.isArray(polls)).toBe(true);
  });

  it('should create, get, update, and delete a poll', () => {
    const newPoll = {
      title: 'Test Poll',
      description: 'A test poll.',
      questions: [
        {
          text: 'Test?',
          type: 'single-choice' as const,
          options: ['A', 'B'],
          required: true,
          allowMultiple: false,
        },
      ],
      expiresAt: null,
      isPublic: true,
    };

    const poll = addPoll(newPoll);
    expect(poll).toHaveProperty('id');
    const fetchedPoll = getPollById(poll.id);
    expect(fetchedPoll).toEqual(expect.objectContaining({ id: poll.id, title: 'Test Poll' }));

    const updated = updatePoll(poll.id, { title: 'Updated Title' });
    expect(updated?.title).toBe('Updated Title');

    const deleted = deletePoll(poll.id);
    expect(deleted).toBe(true);
    expect(getPollById(poll.id)).toBeNull();
  });
});
