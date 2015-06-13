define(function() {
    // "non-embind" bindings
    var API = {
        // constants
        b2_dynamicBody: Box2D.Dynamics.b2Body.b2_dynamicBody,
        b2_kinematicBody: Box2D.Dynamics.b2Body.b2_kinematicBody,
        b2_staticBody: Box2D.Dynamics.b2Body.b2_staticBody,
        // classes
        b2BodyDef: Box2D.Dynamics.b2BodyDef,
        b2FixtureDef: Box2D.Dynamics.b2FixtureDef,
        b2Math: Box2D.Common.Math.b2Math,
        b2PolygonShape: Box2D.Collision.Shapes.b2PolygonShape,
        b2Vec2: Box2D.Common.Math.b2Vec2,
        b2World: Box2D.Dynamics.b2World
    }

    // --- b2BodyDef ---
    API.b2BodyDef.prototype.set_angle = function(value) {
        this.angle = value
    }

    API.b2BodyDef.prototype.set_fixedRotation = function(value) {
        this.fixedRotation = value
    }

    API.b2BodyDef.prototype.set_position = function(value) {
        this.position = value
    }

    API.b2BodyDef.prototype.set_type = function(value) {
        this.type = value
    }

    // --- b2FixtureDef ---
    API.b2FixtureDef.prototype.set_density = function(value) {
        this.density = value
    }

    API.b2FixtureDef.prototype.set_friction = function(value) {
        this.friction = value
    }

    API.b2FixtureDef.prototype.set_restitution = function(value) {
        this.restitution = value
    }

    API.b2FixtureDef.prototype.set_shape = function(value) {
        this.shape = value
    }

    // --- b2Vec2 ---
    API.b2Vec2.prototype.get_x = function() {
        return this.x
    }

    API.b2Vec2.prototype.get_y = function() {
        return this.y
    }

    return API
})
