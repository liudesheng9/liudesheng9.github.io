# [AI Reading] Random Expected Utility

## 1 Explain What Does the Paper Want to Show \& How It Reach the Conclusion 

### 1.1 What Does the Author Want to Show?

The authors, Faruk Gul and Wolfgang Pesendorfer, aim to develop and analyze a model that connects **random choice behavior** to **random expected utility maximization** within the framework of expected utility theory. Specifically, they seek to:

- **Establish a relationship** between **random choice rules** (RCRs) and **random utility functions** (RUFs). A random choice rule describes a decision-maker’s stochastic choice behavior by assigning probabilities to choices in a decision problem (a finite set of lotteries over prizes), while a random utility function is a probability measure over von Neumann-Morgenstern (vNM) utility functions, which represent preferences over lotteries.

- **Identify conditions** under which a random choice rule can be represented as maximizing a **regular random utility function**. A regular RUF is one where, with probability 1, the realized utility function has a unique maximizer in any decision problem (i.e., ties are zero-probability events). The authors propose that a random choice rule maximizes such a function if and only if it satisfies four specific properties: **mixture continuity**, **monotonicity**, **extremeness**, and **linearity**.

- **Characterize the implications** of random expected utility maximization. They demonstrate that these four properties are both necessary and sufficient for a random choice rule to be consistent with maximizing a regular random utility function, providing a foundation for interpreting stochastic choice data (e.g., from experiments or econometric demand analysis) through the lens of expected utility theory.

In essence, the authors want to show that a random choice rule can be rationalized as the outcome of maximizing a regular random expected utility function if and only if it adheres to these four properties, thus extending classical expected utility theory to a stochastic setting.

---

### 1.2 How Do the Authors Reach the Final Conclusion?

The authors reach their final conclusion—stated in **Theorem 2**—through a structured mathematical argument that combines definitions, preliminary results, and a two-part proof. Theorem 2 asserts: *A random choice rule (RCR) is mixture continuous, monotone, linear, and extreme if and only if there exists a regular random utility function (RUF) such that the RCR maximizes it.* Below, I’ll explain the key steps in their approach.

#### Step 1: Define the Framework
- **Setting**: The choice objects are lotteries over a finite set of prizes, represented as points in the unit simplex $P = \{ x \in \mathbb{R}_{+}^{n+1} \mid \sum_{i=1}^{n+1} x^i = 1 \}$. A decision problem $D$ is a finite subset of $P$.
- **Random Choice Rule (RCR)**: denoted $\rho$, assigns a probability measure $\rho^D$ over choices in $D$, with $\rho^D(x)$ being the probability of choosing lottery $x \in D$.
- **Random Utility Function (RUF)**: denoted $\mu$, is a finitely additive probability measure over vNM utility functions $U = \{ u \in \mathbb{R}^{n+1} \mid u^{n+1} = 0 \}$, normalized for simplicity. The set $N(D, x) = \{ u \in U \mid u \cdot x \geq u \cdot y \forall y \in D \}$ represents utility functions that maximize at $x$ in $D$.
- **Maximization**: An RCR $\rho$ maximizes an RUF $\mu$ if $\rho^D(x) = \mu(N(D, x))$ for all $D$ and $x \in D$. A regular RUF ensures $\mu(N^{+}(D, x)) = \mu(N(D, x))$, where $N^{+}(D, x)$ is the set of utilities with $x$ as the unique maximizer.

#### Step 2: Specify the Four Properties
The authors define four properties that an RCR must satisfy:
- **Mixture Continuity**: $\rho^{tD + (1-t)D'}$ is continuous in $t$ for all decision problems $D, D'$. This is a stochastic analogue of the vNM continuity axiom.
- **Monotonicity**: If $x \in D \subset D'$, then $\rho^{D'}(x) \leq \rho^D(x)$. This means adding options does not increase the probability of choosing an existing option.
- **Extremeness**: $\rho^D(\text{ext } D) = 1$, where $\text{ext } D$ are the extreme points of $D$ (lotteries that are unique maximizers for some utility). Non-extreme points are chosen with probability 0.
- **Linearity**: $\rho^{\lambda D + (1-\lambda)\{y\}}(\lambda x + (1-\lambda)y) = \rho^D(x)$ for $\lambda \in (0,1)$ and fixed $y$. This mirrors the independence axiom of expected utility theory.

#### Step 3: Preliminary Results
- **Theorem 1**: Establishes a one-to-one correspondence between regular RUFs and their maximizers. This ensures that if $\rho$ maximizes a regular $\mu$, it is uniquely tied to $\mu$, and every regular $\mu$ has a unique $\rho$.
- **Lemmas**: Several lemmas support the main proof:
  - **Lemma 1**: If $\rho$ is monotone, linear, and extreme, then $\rho^D(x) = \rho^{D'}(x')$ whenever $N(D, x) = N(D', x')$. This consistency is key to constructing $\mu$.
  - **Lemma 2**: A RUF is regular if and only if it is full dimensional (assigns measure 0 to sets of dimension less than $n$), linking regularity to extremeness.
  - **Lemma 3**: Confirms that regular RUFs exist, ensuring the model is non-empty.

#### Step 4: Prove Theorem 2 (Two Directions)
The proof in Appendix B.2 has two parts: the “only if” direction (necessity) and the “if” direction (sufficiency).

##### “Only If” Direction: If $\rho$ Maximizes a Regular $\mu$, It Satisfies the Four Properties
- Assume $\rho^D(x) = \mu(N(D, x))$ for a regular $\mu$.
- **Monotonicity**: If $x \in D \subset D' = D \cup \{y\}$, then $N(D', x) \subseteq N(D, x)$, so $\rho^{D'}(x) = \mu(N(D', x)) \leq \mu(N(D, x)) = \rho^D(x)$.
- **Linearity**: For $D' = \lambda D + (1-\lambda)\{y\}$ and $x' = \lambda x + (1-\lambda)y$, $N(D', x') = N(D, x)$ (by properties of vNM utilities), so $\rho^{D'}(x') = \mu(N(D', x')) = \mu(N(D, x)) = \rho^D(x)$.
- **Extremeness**: If $x$ is not an extreme point, $N^{+}(D, x) = \emptyset$ (no utility uniquely maximizes at $x$), and regularity implies $\mu(N(D, x)) = \mu(N^{+}(D, x)) = 0$, so $\rho^D(x) = 0$.
- **Mixture Continuity**: For $D(t) = tD + (1-t)D'$, $\rho^{D(t)}(x(t)) = \mu(N(D(t), x(t)))$, where $N(D(t), x(t)) = N(D, x) \cap N(D', x')$ for $x(t) = t x + (1-t) x'$. The authors show this is continuous in $t$ using properties of normal cones and regularity.

Thus, the four properties are necessary.

##### “If” Direction: If $\rho$ Satisfies the Four Properties, There Exists a Regular $\mu$ That $\rho$ Maximizes
- Assume $\rho$ is mixture continuous, monotone, linear, and extreme.
- **Construct $\mu$**:
  - For each pointed polyhedral cone $K \in \mathcal{K}$ (normal cones $N(D, x)$ with dimension $n$), define $\mu(\text{ri } K) = \rho^D(x)$ where $K = N(D, x)$. Lemma 1 ensures this is well-defined.
  - If $\dim K < n$, $x$ is not extreme, so $\rho^D(x) = 0$ (by extremeness), and $\mu(\text{ri } K) = 0$.
  - Extend $\mu$ to the algebra $\mathcal{F}$ (generated by normal cones) by finite additivity: if $F = \bigcup H_i$ (disjoint $H_i \in \mathcal{H}$), then $\mu(F) = \sum \mu(H_i)$.
- **Verify Finite Additivity (Lemma 4)**: For $\text{ri } K_0 = \bigcup_{i=1}^m \text{ri } K_i$ (disjoint), construct decision problems $D_i$ with $N(D_i, x_i) = K_i$. Use mixture continuity and linearity to show $\rho^{D_0}(x_0) = \sum_{i=1}^m \rho^{D_i}(x_i)$, hence $\mu(\text{ri } K_0) = \sum_{i=1}^m \mu(\text{ri } K_i)$.
- **Normalize**: Show $\mu(\mathbb{R}^n) = 1$ using a standard set $E^*$ (a cube), where $\sum_{x \in E^*} \rho^{E^*}(x) = 1$.
- **Maximization (Lemma 5)**: For any $D$, $\rho^D(x) = \mu(N(D, x))$. For full-dimensional $D$, this holds by construction. For lower-dimensional $D$, use mixture continuity with $D + \alpha E^*$ to extend the result as $\alpha \to 0$.
- **Regularity**: Since $\rho$ is extreme, $\mu$ assigns 0 to non-extreme points’ normal cones (dimension < $n$), making $\mu$ full dimensional and thus regular (Lemma 2).

Thus, the four properties are sufficient.

#### Final Conclusion
Theorem 2 concludes that the four properties—mixture continuity, monotonicity, extremeness, and linearity—are **necessary and sufficient** for a random choice rule to maximize a regular random utility function. The “only if” part shows these properties follow from maximization, while the “if” part constructs a regular $\mu$ from a $\rho$ satisfying these properties, completing the characterization.


## 2. Explain the RUF

### 2.1 What is a Random Utility Function (RUF)?

A **Random Utility Function (RUF)** is a concept used to model decision-making under uncertainty, particularly when choices appear stochastic (random). It is a probability measure defined over a set of von Neumann-Morgenstern (vNM) utility functions, which are mathematical functions that represent a decision-maker’s preferences over lotteries—probability distributions over a finite set of prizes (e.g., money, goods). Unlike a traditional utility function that assumes a fixed preference, an RUF assumes that the decision-maker’s utility function is randomly drawn from a distribution, reflecting variability or uncertainty in preferences.

Here’s how it works:

- **Set of Utility Functions**: Consider a finite set of prizes, say $N = \{1, 2, \ldots, n+1\}$. Lotteries are points in the simplex $P = \{ x \in \mathbb{R}_{+}^{n+1} \mid \sum_{i=1}^{n+1} x^i = 1 \}$, where $x^i$ is the probability of prize $i$. The vNM utility functions are linear functions $u: P \to \mathbb{R}$, represented as vectors in $U = \{ u \in \mathbb{R}^{n+1} \mid u^{n+1} = 0 \}$, normalized so the utility of the last prize is zero. For a lottery $x$, the utility is $u \cdot x = \sum_{i=1}^{n+1} u^i x^i$.

- **Probability Measure**: An RUF, denoted $\mu$, is a finitely additive probability measure on $(U, \mathcal{F})$, where $\mathcal{F}$ is an algebra of subsets of $U$ generated by sets like $N(D, x) = \{ u \in U \mid u \cdot x \geq u \cdot y \text{ for all } y \in D \}$. Here, $D$ is a decision problem (a finite set of lotteries), and $x \in D$. The measure satisfies $\mu(U) = 1$ and $\mu(F \cup F') = \mu(F) + \mu(F')$ for disjoint $F, F' \in \mathcal{F}$.

- **Choice Behavior**: When faced with a decision problem $D$, the decision-maker’s choice is modeled as follows: a utility function $u$ is drawn from $\mu$, and the decision-maker chooses a lottery $x \in D$ that maximizes $u \cdot x$. The probability of choosing $x$ from $D$, denoted $\rho^D(x)$, is $\mu(N(D, x))$, the measure of utility functions that prefer $x$ over all other lotteries in $D$.

- **Regular RUF**: An RUF is **regular** if, for every decision problem $D$, the probability is 1 that the drawn utility function $u$ has a unique maximizer in $D$ (i.e., no ties). This simplifies analysis by ensuring that $\mu(N^{+}(D, x)) = \mu(N(D, x))$, where $N^{+}(D, x) = \{ u \in U \mid u \cdot x > u \cdot y \text{ for all } y \in D, y \neq x \}$.

In essence, an RUF provides a framework to interpret random choice behavior as the outcome of maximizing a randomly selected utility function, aligning with expected utility theory but allowing for stochastic preferences.

---

### 2.2 Explanation of the Two Examples

The authors provide two examples to illustrate how RUFs work and how they lead to specific random choice behaviors. Let’s explore each in detail.

#### Example 1: Two Prizes ($n+1 = 2$)

**Setting**:
- There are two prizes, so $n+1 = 2$, and $n = 1$. Lotteries are pairs $(x^1, x^2)$ where $x^1 + x^2 = 1$, and $x^1$ is the probability of prize 1.
- The set of utility functions is $U = \{ u \in \mathbb{R}^2 \mid u^2 = 0 \}$, which can be thought of as $\mathbb{R} \times \{0\}$. Since vNM utility functions are unique up to positive scaling, we focus on distinct preference types:
  - $u = (0, 0)$: indifferent between all lotteries.
  - $u' = (1, 0)$: prefers prize 1 (utility $u' \cdot x = x^1$).
  - $u'' = (-1, 0)$: prefers prize 2 (utility $u'' \cdot x = -x^1$).
- Define sets:
  - $F_0 = \{ (0, 0) \}$: indifference.
  - $F_1 = \{ \lambda (1, 0) \mid \lambda > 0 \}$: prefers prize 1.
  - $F_{-1} = \{ \lambda (-1, 0) \mid \lambda > 0 \}$: prefers prize 2.
- The algebra $\mathcal{F}$ includes all unions of $\emptyset, F_0, F_1, F_{-1}$.

**RUF Definition**:
- The RUF $\mu$ is defined as:
  - $\mu(F_0) = 0$ (indifference has zero probability).
  - $\mu(F_1) = \frac{1}{2}$ (prefers prize 1 with probability $\frac{1}{2}$).
  - $\mu(F_{-1}) = \frac{1}{2}$ (prefers prize 2 with probability $\frac{1}{2}$).
- This models an agent equally likely to prefer prize 1 or prize 2, with no chance of indifference.

**Random Choice Rule (RCR)**:
- For a decision problem $D = \{ x_1, x_2, \ldots, x_k \}$ with lotteries ordered by prize 1 probability ($x_1^1 < x_2^1 < \cdots < x_k^1$), the RCR $\rho$ that maximizes $\mu$ is:
  - $\rho^D(x_1) = \frac{1}{2}$ (chooses the lottery with the least prize 1 probability).
  - $\rho^D(x_k) = \frac{1}{2}$ (chooses the lottery with the most prize 1 probability).
  - $\rho^D(x_i) = 0$ for $i \neq 1, k$ (other lotteries are not chosen).
- **Why?**
  - If $u \in F_1$ (probability $\frac{1}{2}$), the agent maximizes $u \cdot x = x^1$, choosing $x_k$ (highest $x^1$).
  - If $u \in F_{-1}$ (probability $\frac{1}{2}$), the agent maximizes $u \cdot x = -x^1$, choosing $x_1$ (lowest $x^1$).
  - $F_0$ has measure zero, so indifference doesn’t affect choices.

**Regularity**:
- The RUF is regular because $\mu(F_0) = 0$. The indifferent utility $(0, 0)$ could lead to ties, but it has zero probability, ensuring a unique maximizer with probability 1.

**Intuition**:
- Imagine choosing between lotteries like $(0.2, 0.8)$ and $(0.7, 0.3)$. Half the time, the agent picks $(0.7, 0.3)$ (prefers prize 1), and half the time $(0.2, 0.8)$ (prefers prize 2), reflecting the equal split in preferences.

#### Example 2: Three Prizes ($n+1 = 3$)

**Setting**:
- There are three prizes, so $n+1 = 3$, and $n = 2$. Lotteries are triples $(x^1, x^2, x^3)$ with $x^1 + x^2 + x^3 = 1$.
- The set of utility functions is $U = \{ (u^1, u^2, 0) \mid u^1, u^2 \in \mathbb{R} \}$, identified with $\mathbb{R}^2 \times \{0\}$.
- Define $F_{u v} = \{ \alpha (u, 0) + \beta (v, 0) \mid \alpha, \beta > 0 \}$ for $u, v \in \mathbb{R}^2$:
  - If $u$ and $v$ are not collinear ($u \neq \lambda v$), $F_{u v}$ includes utility functions that are strict convex combinations of $(u, 0)$ and $(v, 0)$.
  - If $u = \lambda v$, $F_{u v}$ is the set of positive multiples of $(u, 0)$.
- The algebra $\mathcal{F}$ is generated by finite unions of such sets.

**RUF Definition**:
- The RUF $\mu$ is:
  - $\mu(F_{u v}) = 0$ if $u = \lambda v$ (single-direction utilities have zero measure).
  - $\mu(F_{u v}) = \frac{1}{2\pi} \arccos \left( \frac{u \cdot v}{|u||v|} \right)$ if $u \neq \lambda v$ (measure depends on the angle between $u$ and $v$).
- This resembles a “uniform distribution” over preference directions in $\mathbb{R}^2$, with measure proportional to the angle between vectors.

**Random Choice Rule (RCR)**:
- For a decision problem $D$:
  - **One-Dimensional Case**: If $D$ lies on a line (all lotteries are convex combinations of two extremes, e.g., $x$ and $y$), then $\rho^D(x) = \rho^D(y) = \frac{1}{2}$. This mirrors Example 1, choosing extremes equally.
  - **Two-Dimensional Case**: If $D$ spans a 2D space, for each $x \in D$, $N(D, x) = \{ \alpha u + \beta v \mid \alpha, \beta \geq 0 \}$ for some $u, v \in \mathbb{R}^2$ (a normal cone). Then, $\rho^D(x) = \mu(F_{u v})$, proportional to the angle between $u$ and $v$.
- **Why?**
  - In 1D, utility functions split into preferring one extreme or the other, balanced by the uniform distribution.
  - In 2D, $N(D, x)$ defines a cone of utilities maximizing $x$, and $\mu$ assigns a probability based on the cone’s “width” (angle).

**Regularity**:
- The RUF is regular because $\mu(F_{u v}) = 0$ when $u = \lambda v$. Utilities in a single direction (which could cause ties) have zero measure, ensuring unique maximizers with probability 1.

**Intuition**:
- For three prizes, imagine lotteries like $(0.5, 0.5, 0)$, $(0, 0.5, 0.5)$, and $(0.5, 0, 0.5)$. The RUF spreads preferences across all directions in $\mathbb{R}^2$. In a 1D subset, it picks extremes equally; in 2D, it weights choices by the geometric spread of preferences favoring each lottery.

---

### 2.3 Summary

- **RUF**: A probability distribution over utility functions, modeling random choice as maximizing a randomly drawn utility, with regularity ensuring unique maximizers.
- **Example 1**: With two prizes, the RUF splits preference equally between prizes, leading to choosing extreme lotteries with equal probability.
- **Example 2**: With three prizes, the RUF distributes preferences uniformly over directions, resulting in equal choice of extremes in 1D cases and angle-based probabilities in 2D cases.