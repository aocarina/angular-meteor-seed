//
// *** Schema default fields
//

Schema = {
  fields: {}
};

Schema.fields.ownerId = {
  type: String,
  autoValue: function() {
    if ( ! this.docId ) {
      return this.userId;
    }
  }
};

Schema.fields.createdAt = {
  type: Date,
  autoValue: function() {
    if ( ! this.docId ) {
      return new Date;
    }
  }
};

Schema.fields.updatedAt = {
  type: Date,
  autoValue: function() {
    return new Date();
  }
};
