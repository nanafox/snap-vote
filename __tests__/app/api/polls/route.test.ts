import { POST, GET } from '@/app/api/polls/route';
import { addPoll, getAllPolls } from '@/lib/polls/storage';

// Mock the storage module to isolate route handler logic
jest.mock('@/lib/polls/storage', () => ({
  // Use jest.requireActual to get the original module
  ...jest.requireActual('@/lib/polls/storage'),
  // Mock specific functions
  addPoll: jest.fn(),
  getAllPolls: jest.fn(() => []),
}));

describe('Polls API Route', () => {
  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('should return an array of polls', async () => {
      // Create a mock request
      const req = new Request('http://localhost/api/polls', { method: 'GET' });
      const res = await GET(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(getAllPolls).toHaveBeenCalled();
      expect(Array.isArray(data.polls)).toBe(true);
    });
  });

  describe('POST', () => {
    it('should create a new poll with valid data', async () => {
      const pollData = {
        title: 'Test Poll',
        questions: [{ text: 'Question 1?', type: 'text', options: [] }],
      };

      const req = new Request('http://localhost/api/polls', {
        method: 'POST',
        body: JSON.stringify(pollData),
      });

      // Mock the return value for addPoll
      const createdPoll = { ...pollData, id: 'poll_123' };
      addPoll.mockReturnValue(createdPoll);

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(201);
      expect(addPoll).toHaveBeenCalledWith(expect.objectContaining({ title: 'Test Poll' }));
      expect(data.poll).toEqual(createdPoll);
    });

    it('should return a 400 error for invalid data', async () => {
      // Missing 'questions' field
      const invalidPollData = { title: 'Invalid Poll' };

      const req = new Request('http://localhost/api/polls', {
        method: 'POST',
        body: JSON.stringify(invalidPollData),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.errors).toHaveProperty('questions');
      expect(addPoll).not.toHaveBeenCalled();
    });
  });
});
