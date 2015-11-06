var HEXAGRAM = HEXAGRAM || {};

HEXAGRAM.Ring = function (config) {
	var that = this;
	var parent = config.parent;
	this.circle = parent.canvas.append("circle");
	this.circle
		.attr("r", 0)
		.attr("cx", parent.width / 2)
		.attr("cy", parent.height / 2)
		.attr("opacity", 1)
		.attr("stroke", parent.styles.colors.ring)
		.attr("fill", "none")
		.style("filter", "url(#drop-shadow" + parent.id + ")")
		.attr("stroke-width", config.strokeWidth || config.radius / 100);
	if (config.strokeWidth > 5) {
		this.circle
			.style("filter", "none");
	}
	this.transition = this.circle.transition()
		.duration(parent.styles.animation.inSpeed)
		.attr("r", config.radius + config.strokeWidth / 2)
		.each("end", function() {
			that.transition = null;
		});
	if (config.strokeWidth) {
		parent.currentRadius += config.strokeWidth;
	}
	return this;
};

HEXAGRAM.Ring.prototype.recolor = function (newColor) {
	this.transition = this.transition || this.circle.transition();
	if (newColor == "useNone") {
		this.transition
			.attr("stroke", "rgba(0,0,0,0)")
			.attr("fill-opacity", "0.0");
		return;
	}
	this.transition
		.attr("stroke", newColor);
};

HEXAGRAM.Ring.prototype.on = function(event, listener) {
	this.circle.on(event, listener);
};

HEXAGRAM.Ring.prototype.disperse = function() {
	var deferred = Q.defer();
	this.circle
		.transition()
		.duration(parent.styles.animation.inSpeed)
		.attr("opacity", 0)
		.attr("r", 0)
		.each("end", deferred.resolve, this.circle);
	return deferred.promise;
};