class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.text :summary
      t.text :content
      t.text :markdown
      t.string :author
      t.string :img
      t.integer :user_id
      t.datetime :publish_time
      t.integer :is_recommend
      t.integer :is_published
      t.integer :can_comment

      t.timestamps null: false
    end
  end
end
