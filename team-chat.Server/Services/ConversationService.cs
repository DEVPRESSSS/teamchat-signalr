using Microsoft.AspNetCore.Http.HttpResults;
using team_chat.Server.DTO;
using team_chat.Server.Model;
using team_chat.Server.Repositories.Interfaces;
using team_chat.Server.Services.Interfaces;
using team_chat.Server.Utilities;

namespace team_chat.Server.Services
{
    public class ConversationService : IConversationService
    {
        private readonly IConversationParticipantRepostitory _converstaionParticipantRepository;
        public ConversationService(IConversationParticipantRepostitory converstaionParticipantRepository)
        {
            _converstaionParticipantRepository = converstaionParticipantRepository;
        }
        public async Task<List<ContactsDto>> GetAllContacts(Guid userId)
        {
           
            var user = await _converstaionParticipantRepository.GetAllAsync(x => x.UserId == userId, includeProperties: "User,Conversation");
            if (user == null) throw new ExceptionHandler(500, "Failed to find conversations!!!");

            var listOfConversations = user.Select(s => new ContactsDto
            {
                    UserId = s.UserId,
                    FullName = s.User.Name,
                    ProfilePath = s.User.ProfilePath,
                  


             }).ToList();

             return listOfConversations;
         
        }
    }
}
