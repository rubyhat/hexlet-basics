# frozen_string_literal: true

# == Schema Information
#
# Table name: language_members
#
#  id                     :bigint           not null, primary key
#  finished_lessons_count :integer          default(0), not null
#  state                  :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  language_id            :bigint           not null
#  user_id                :bigint           not null
#
# Indexes
#
#  index_language_members_on_language_id  (language_id)
#  index_language_members_on_user_id      (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (language_id => languages.id)
#  fk_rails_...  (user_id => users.id)
#
class Language::Member < ApplicationRecord
  include AASM

  def self.ransackable_attributes(_auth_object = nil)
    %w[id created_at language_id]
  end

  belongs_to :user
  belongs_to :language
  has_many :lesson_members, class_name: "Language::Lesson::Member", foreign_key: :language_member_id, inverse_of: :language_member, dependent: :destroy

  counter_culture :language

  enum :state, { started: "started", finished: "finished" }
  aasm :state, enum: true do
    state :started, initial: true
    state :finished

    event :finish do
      transitions from: %i[started], to: :finished, guard: :all_lessons_finished?
    end
  end

  def all_lessons_finished?
    not_finished_lessons = user.not_finished_lessons_for_language(language)

    not_finished_lessons.empty?
  end

  def next_lesson_info
    finished_lesson_ids = user.finished_lessons_for_language(language).pluck(:id)
    not_finished_infos = language.current_lesson_infos.with_locale.where.not(language_lesson_id: finished_lesson_ids)
      .joins(:lesson).merge(Language::Lesson.ordered)

    not_finished_infos.first
  end
end
