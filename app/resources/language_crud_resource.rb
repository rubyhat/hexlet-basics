class LanguageCrudResource < ApplicationResource
  urls =  Rails.application.routes.url_helpers

  typelize_from Language
  root_key :data

  attributes :id, :progress, :learn_as, :slug, :openai_assistant_id, :hexlet_program_landing_page, :cover

  typelize_meta meta: "{ modelName: string, cover_signed_id: string, cover_thumb_url: string, repository_url: string, slug: string }"
  meta do
    {
      # cover_signed_id: object.cover.signed_id,
      # state_events: object.aasm.events_for_select,
      cover_thumb_url: object.cover.attached? ?
      urls.rails_representation_url(object.cover.variant(:thumb)) : nil,
      repository_url: object.repository_url,
      slug: object.slug,
      modelName: object.class.superclass.to_s.underscore
    }
  end
end
