class Survey::ScenarioResource < ApplicationResource
  typelize_from Survey::Scenario

  attributes :id, :created_at
end
