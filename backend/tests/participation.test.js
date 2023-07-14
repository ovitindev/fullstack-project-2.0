import { getAllParticipations, createParticipation, deleteParticipation } from '../src/controllers/participations';
import Participation from '../src/models/Participation';

describe('Participation', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    test('deve chamar o método "getAllParticipations" do model corretamente', async () => {
      const findSpy = jest.spyOn(Participation, 'find').mockResolvedValue([{ _id: '123' }]);
      const response = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      await getAllParticipations({}, response);
  
      expect(findSpy).toHaveBeenCalled();
      expect(response.json).toHaveBeenCalledWith([{ _id: '123' }]);
    });
  });

  describe('create', () => {
    test('deve chamar o método "create" do model corretamente', async () => {
      const createSpy = jest.spyOn(Participation, 'create').mockResolvedValue({ _id: '456' });
      const requisition = {
        body: {
          first_name: 'foo',
          last_name: 'bar',
          participation: 10,
          color: '#ffffff',
        },
      };
      const response = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      await createParticipation(requisition, response);
  
      expect(createSpy).toHaveBeenCalledWith(requisition.body);
      expect(response.json).toHaveBeenCalledWith({ _id: '456' });
    });
  });
  
  describe('delete', () => {
    test('deve chamar o método "findByIdAndDelete" do model corretamente', async () => {
      const findByIdAndDeleteSpy = jest.spyOn(Participation, 'findByIdAndDelete').mockResolvedValue({ _id: '789' });
      const requisition = {
        params: {
          id: '789',
        },
      };
      const response = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      await deleteParticipation(requisition, response);
  
      expect(findByIdAndDeleteSpy).toHaveBeenCalledWith(requisition.params.id);
      expect(response.json).toHaveBeenCalledWith({ message: 'Participation excluída com sucesso' });
    });
  });
});
