using Microsoft.AspNetCore.Http.HttpResults;
using team_chat.Server.DTO;
using team_chat.Server.Model;
using team_chat.Server.Repositories.Interfaces;
using team_chat.Server.Services.Interfaces;
using team_chat.Server.Utilities;
using team_chat.Server.Utilities.Enums;

namespace team_chat.Server.Services
{
    public class ConversationService : IConversationService
    {
        private readonly IConversationParticipantRepostitory _converstaionParticipantRepository;
        private readonly IUserRepository _userRepository;
        private readonly IConversationRepository _conversationRepository;
        public ConversationService(IConversationParticipantRepostitory converstaionParticipantRepository,
             IUserRepository userRepository,
             IConversationRepository conversationRepository
            )
        {
            _converstaionParticipantRepository = converstaionParticipantRepository;
            _userRepository = userRepository;
            _conversationRepository = conversationRepository;
        }
        #region--Should be move in Userservice
        public async Task<List<ContactsDto>> GetAllActiveUsers(Guid userId)
        {
            var user = await _userRepository.GetAllAsync(x=>x.Id != userId);
            if (user == null) throw new ExceptionHandler(500, "Failed to find conversations!!!");

            var listOfActiveUsers = user.Select(s => new ContactsDto
            {
                UserId = s.Id,
                FullName = s.Name,
                ProfilePath = s.ProfilePath,


            }).ToList();

            return listOfActiveUsers;
        }

        #endregion


        #region--Get all the contacts of the user
        public async Task<List<RecentsDto>> GetAllContacts(Guid userId)
        {
           
            var listOfConversations = await _converstaionParticipantRepository.GetAllRecentConversation(userId);
            if (listOfConversations == null) throw new ExceptionHandler(500, "Failed to find conversations!!!");

            return listOfConversations;
         
        }
        #endregion

        #region--Get specific user
        public async Task<ContactsDto> GetUser(Guid userId)
        {
            var user = await _userRepository.GetAsync(x => x.Id == userId);
            if (user == null) throw new ExceptionHandler(400, "User not found!!");

            var userInfo = new ContactsDto{ UserId = user.Id, FullName = user.Name, ProfilePath = user.ProfilePath };

            return userInfo;

        }
        #endregion

        #region --CreateConversation
        public async Task<Guid> GetOrCreateConversationAsync(
            Guid userId,
            Guid receiverId)
        {
            var existingConversationId =
                await _converstaionParticipantRepository
                    .FindSharedConversationIdAsync(userId, receiverId);

            if (existingConversationId is not null)
            {
                return existingConversationId.Value;
            }

            var conversationId = Guid.NewGuid();

            var conversationObj = new Conversation
            {
                ConversationId = conversationId,
                Type = ConversationTypeEnum.Direct,
            };

            await _conversationRepository.AddAsync(conversationObj);

            await _converstaionParticipantRepository.AddAsync(
                new ConversationParticipant
                {
                    Id = Guid.NewGuid(),
                    ConversationId = conversationId,
                    UserId = userId
                });

            await _converstaionParticipantRepository.AddAsync(
                new ConversationParticipant
                {
                    Id = Guid.NewGuid(),
                    ConversationId = conversationId,
                    UserId = receiverId
                });

            await _userRepository.Save();

            return conversationId;
        }
        #endregion
    }
}
