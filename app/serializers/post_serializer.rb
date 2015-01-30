class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :summary, :content, :img,
             :markdown, :author, :publish_time,
             :is_recommend, :is_published, :can_comment
	has_many :tags
end
