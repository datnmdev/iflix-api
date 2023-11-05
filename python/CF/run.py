import sys
from CF import CF
import pandas as pd
import json

rating_model = CF(Y_data=pd.read_excel(sys.argv[2]).to_numpy())
rating_model.fit()
print(json.dumps(rating_model.recommend(sys.argv[1])))