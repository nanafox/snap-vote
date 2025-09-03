import { GET, PUT, DELETE } from '@/app/api/polls/[id]/route';
import { getPollById, updatePoll, deletePoll } from '@/lib/polls/storage';

// Mock the storage module
jest.mock('@/lib/polls/storage', () => ({
  getPollById: jest.fn(),
  updatePoll: jest.fn(),
  deletePoll: jest.fn(),
}));

describe('Polls API [id] Route', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('should return a poll if found', async () => {
      const poll = {
        id: 'test-id',
        title: 'Test Poll',
        createdAt: new Date(),
        updatedAt: new Date(),
        expiresAt: null,
      };
      getPollById.mockReturnValue(poll);

      const res = await GET(new Request('http://localhost/api/polls/test-id'), {
        params: { id: 'test-id' },
      });
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.poll.id).toBe('test-id');
      expect(getPollById).toHaveBeenCalledWith('test-id');
    });

    it('should return 404 if poll not found', async () => {
      getPollById.mockReturnValue(null);
      const res = await GET(new Request('http://localhost/api/polls/not-found'), {
        params: { id: 'not-found' },
      });
      expect(res.status).toBe(404);
    });
  });

  describe('PUT', () => {
    it('should update a poll successfully', async () => {
      const updatedData = { title: 'Updated Title' };
      const req = new Request('http://localhost/api/polls/test-id', {
        method: 'PUT',
        body: JSON.stringify(updatedData),
      });
      updatePoll.mockReturnValue({ id: 'test-id', ...updatedData });

      const res = await PUT(req, { params: { id: 'test-id' } });
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(updatePoll).toHaveBeenCalledWith('test-id', updatedData);
      expect(data.poll.title).toBe('Updated Title');
    });
  });

  describe('DELETE', () => {
    it('should delete a poll successfully', async () => {
      deletePoll.mockReturnValue(true);
      const res = await DELETE(new Request('http://localhost/api/polls/test-id'), {
        params: { id: 'test-id' },
      });
      expect(res.status).toBe(200);
      expect(deletePoll).toHaveBeenCalledWith('test-id');
    });

    it('should return 404 if poll to delete is not found', async () => {
      deletePoll.mockReturnValue(false);
      const res = await DELETE(new Request('http://localhost/api/polls/not-found'), {
        params: { id: 'not-found' },
      });
      expect(res.status).toBe(404);
    });
  });
});
